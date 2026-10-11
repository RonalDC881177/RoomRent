import Message from "../models/message.js";
import Property from "../models/Property.js";
import mongoose from "mongoose";

export const createMessage = async (req, res) => {
    try {
        const { propertyId, message } = req.body;
        const userId = req.user._id;

        // 1. Validar los datos.
        const cleanMessage =
            typeof message === "string" ? message.trim() : "";

        if (
            !propertyId ||
            !mongoose.Types.ObjectId.isValid(propertyId) ||
            !cleanMessage ||
            cleanMessage.length > 1000
        ) {
            return res.status(400).json({
                message:
                    "Datos inválidos. El mensaje debe tener entre 1 y 1000 caracteres y la propiedad debe ser válida.",
            });
        }

        // 2. Buscar la propiedad.
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({
                message: "Propiedad no encontrada",
            });
        }

        const ownerId = property.owner.toString();
        const currentUserId = userId.toString();

        // 3. Consultar el último mensaje de esta conversación.
        const lastMessage = await Message.findOne({
            property: propertyId,
            $or: [
                { sender: userId, receiver: property.owner },
                { sender: property.owner, receiver: userId },
            ],
        }).sort({ createdAt: -1, _id: -1 });

        let receiverId;

        // 4. Si escribe el propietario, debe responder
        // a una conversación existente dirigida a él.
        if (currentUserId === ownerId) {
            if (!lastMessage) {
                return res.status(403).json({
                    message:
                        "No puedes iniciar una conversación. Debes responder a un mensaje recibido.",
                });
            }

            if (
                lastMessage.receiver.toString() !== currentUserId
            ) {
                return res.status(409).json({
                    message:
                        "No tienes un mensaje pendiente por responder.",
                });
            }

            receiverId = lastMessage.sender;
        } else {
            // 5. Si escribe un arrendatario, no puede
            // enviar mensajes consecutivos sin respuesta.
            if (
                lastMessage &&
                lastMessage.sender.toString() === currentUserId
            ) {
                return res.status(409).json({
                    message:
                        "Debes esperar a que el arrendador responda antes de enviar otro mensaje.",
                });
            }

            receiverId = property.owner;
        }

        // 6. Crear el mensaje.
        const newMessage = await Message.create({
            sender: userId,
            receiver: receiverId,
            property: propertyId,
            message: cleanMessage,
        });

        return res.status(201).json({
            message: "Mensaje enviado correctamente",
            data: newMessage,
        });
    } catch (error) {
        console.error("Error al enviar mensaje:", error);

        return res.status(500).json({
            message: "Error al enviar el mensaje",
        });
    }
};

// Obtener inbox del usuario
export const getInbox = async (req, res) => {
    try {
        const userId = req.user._id;

        const messages = await Message.find({
            $or: [{ sender: userId }, { receiver: userId }],
        })
            .sort({ createdAt: -1 })
            .populate("sender", "username email")
            .populate("receiver", "username email")
            .populate("property", "title");

        const conversationsMap = new Map();

        messages.forEach((msg) => {
            if (!msg.sender || !msg.receiver || !msg.property) return;

            const otherUser =
                msg.sender._id.toString() === userId.toString()
                    ? msg.receiver
                    : msg.sender;

            const key = `${otherUser._id}-${msg.property._id}`;

            if (!conversationsMap.has(key)) {
                conversationsMap.set(key, {
                    user: otherUser,
                    property: msg.property,
                    lastMessage: msg.message,
                    date: msg.createdAt,
                });
            }
        });

        const conversations = Array.from(conversationsMap.values());

        return res.json(conversations);
    } catch (error) {
        console.error("ERROR INBOX:", error);

        return res.status(500).json({
            message: "Error al consultar la bandeja de entrada",
        });
    }
};