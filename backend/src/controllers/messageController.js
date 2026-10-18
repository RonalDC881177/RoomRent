import Message from "../models/message.js";
import Property from "../models/Property.js";
import mongoose from "mongoose";


export const createMessage = async (req, res) => {
    try {
        const { propertyId, message, otherUserId } = req.body;
        const userId = req.user._id;

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

        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({
                message: "Propiedad no encontrada",
            });
        }

        const ownerId = String(property.owner);
        const currentUserId = String(userId);
        const isOwner = currentUserId === ownerId;

        let receiverId;

        if (isOwner) {
            // El propietario debe responder a un participante concreto.
            if (
                !otherUserId ||
                !mongoose.Types.ObjectId.isValid(otherUserId) ||
                String(otherUserId) === ownerId
            ) {
                return res.status(400).json({
                    message: "Debes indicar un destinatario válido.",
                });
            }

            const lastMessage = await Message.findOne({
                property: propertyId,
                $or: [
                    {
                        sender: otherUserId,
                        receiver: userId,
                    },
                    {
                        sender: userId,
                        receiver: otherUserId,
                    },
                ],
            }).sort({ createdAt: -1, _id: -1 });

            if (!lastMessage) {
                return res.status(403).json({
                    message:
                        "No puedes iniciar una conversación. Debes responder a un mensaje recibido.",
                });
            }

            if (String(lastMessage.receiver) !== currentUserId) {
                return res.status(409).json({
                    message:
                        "No tienes un mensaje pendiente por responder.",
                });
            }

            receiverId = lastMessage.sender;
        } else {
            // Un arrendatario solo puede contactar al propietario.
            if (
                otherUserId &&
                String(otherUserId) !== ownerId
            ) {
                return res.status(403).json({
                    message:
                        "Solo puedes enviar mensajes al propietario de esta propiedad.",
                });
            }

            const lastMessage = await Message.findOne({
                property: propertyId,
                $or: [
                    {
                        sender: userId,
                        receiver: property.owner,
                    },
                    {
                        sender: property.owner,
                        receiver: userId,
                    },
                ],
            }).sort({ createdAt: -1, _id: -1 });

            if (
                lastMessage &&
                String(lastMessage.sender) === currentUserId
            ) {
                return res.status(409).json({
                    message:
                        "Debes esperar a que el arrendador responda antes de enviar otro mensaje.",
                });
            }

            receiverId = property.owner;
        }

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
            .populate("sender", "username")
            .populate("receiver", "username")
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

// Obtener historial de una conversación
export const getConversation = async (req, res) => {
    try {
        const userId = req.user._id;
        const { propertyId, otherUserId } = req.params;

        // 1. Validar los identificadores recibidos.
        if (
            !mongoose.Types.ObjectId.isValid(propertyId) ||
            !mongoose.Types.ObjectId.isValid(otherUserId)
        ) {
            return res.status(400).json({
                message: "Los identificadores no son válidos.",
            });
        }

        // 2. Evitar consultar una conversación con uno mismo.
        if (String(userId) === String(otherUserId)) {
            return res.status(400).json({
                message: "No puedes consultar una conversación contigo mismo.",
            });
        }

        // 3. Verificar que la propiedad exista.
        const property = await Property.findById(propertyId).select("owner");

        if (!property) {
            return res.status(404).json({
                message: "La propiedad no existe.",
            });
        }

        // 4. Verificar que el propietario sea uno de los participantes.
        const ownerId = String(property.owner);

        if (
            ownerId !== String(userId) &&
            ownerId !== String(otherUserId)
        ) {
            return res.status(403).json({
                message: "No tienes permiso para consultar esta conversación.",
            });
        }

        // 2. Verificar que el usuario sea uno de los participantes.
        const messages = await Message.find({
            property: propertyId,
            $or: [
                { sender: userId, receiver: otherUserId },
                { sender: otherUserId, receiver: userId },
            ],
        })
            .sort({ createdAt: 1, _id: 1 })
            .populate("sender", "username name")
            .populate("receiver", "username name");

        // 3. No mostrar conversaciones inexistentes.
        if (messages.length === 0) {
            return res.status(404).json({
                message: "No se encontró la conversación.",
            });
        }

        // 4. Responder con el historial ordenado.
        return res.status(200).json({
            conversation: {
                propertyId,
                otherUserId,
                messages,
            },
        });
    } catch (error) {
        console.error("Error al consultar la conversación:", error);

        return res.status(500).json({
            message: "Error al consultar el historial.",
        });
    }
};

// Marcar como leídos los mensajes recibidos en una conversación
export const markMessagesAsRead = async (req, res) => {
    try {
        const userId = req.user._id;
        const { propertyId, otherUserId } = req.params;

        if (
            !mongoose.Types.ObjectId.isValid(propertyId) ||
            !mongoose.Types.ObjectId.isValid(otherUserId)
        ) {
            return res.status(400).json({
                message: "Los identificadores no son válidos.",
            });
        }

        if (String(userId) === String(otherUserId)) {
            return res.status(400).json({
                message: "No puedes marcar mensajes propios como recibidos.",
            });
        }

        const property = await Property.findById(propertyId).select("owner");

        if (!property) {
            return res.status(404).json({
                message: "La propiedad no existe.",
            });
        }

        const ownerId = String(property.owner);
        const currentUserId = String(userId);
        const participantId = String(otherUserId);

        // Solo el propietario y el participante pueden acceder.
        if (
            currentUserId !== ownerId &&
            participantId !== ownerId
        ) {
            return res.status(403).json({
                message: "No tienes permiso para consultar esta conversación.",
            });
        }

        // Actualizar únicamente los mensajes que el usuario actual recibió.
        const result = await Message.updateMany(
            {
                property: propertyId,
                sender: otherUserId,
                receiver: userId,
                read: false,
            },
            {
                $set: { read: true },
            }
        );

        return res.status(200).json({
            message: "Mensajes marcados como leídos.",
            data: {
                modifiedCount: result.modifiedCount,
            },
        });
    } catch (error) {
        console.error("Error al marcar mensajes como leídos:", error);

        return res.status(500).json({
            message: "Error al actualizar el estado de lectura.",
        });
    }
};