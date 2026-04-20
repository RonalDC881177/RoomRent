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
