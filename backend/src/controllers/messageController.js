import Message from "../models/Message.js";
import Property from "../models/Property.js";

export const createMessage = async (req, res) => {
    try {
        const { propertyId, message } = req.body;

        //1. validar datos
        if (!propertyId || !message) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios",
            });
        }

        //2. buscar propiedad
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({
                message: "Propiedad no encontrada",
            });
        }

        //3. crear mensaje
        const newMessage = await Message.create({
            sender: req.userId,
            receiver: property.owner, //dueño de la propiedad
            property: propertyId,
            message,
        });

        res.status(201).json({
            message: "Mensaje enviado correctamente",
            data: newMessage,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al enviar el mensaje",
        });
    }
};
// Obtener inbox del usuario
export const getInbox = async (req, res) => {
    try {
        const userId = req.user._id;

        //console.log("USER ID:", userId);

        const messages = await Message.find({
            $or: [{ sender: userId }, { receiver: userId }],
        })
            .sort({ createdAt: -1 })
            .populate("sender", "username email")
            .populate("receiver", "username email")
            .populate("property", "title");

        //console.log("MENSAJES:", messages);

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
        res.status(500).json({ message: error.message });
    }
};