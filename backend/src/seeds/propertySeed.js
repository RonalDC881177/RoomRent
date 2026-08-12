import mongoose from "mongoose";
import Property from "../models/Property.js";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const propertySeed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB conectado");

        const owner = await User.findOne({
            username: "carlosramirez",
            role: "arrendador",
        });

        if (!owner) {
            throw new Error(
                "No se encontró el usuario arrendador carlosramirez"
            );
        }

        await Property.deleteMany({});

        const properties = [
            {
                title: "Habitación económica en Chapinero",
                description:
                    "Habitación cómoda y económica ubicada cerca de universidades y transporte público.",
                propertyType: "habitacion",
                price: {
                    amount: 450000,
                    currency: "COP",
                    period: "monthly",
                },
                city: "Bogotá",
                locality: "Chapinero",
                neighborhood: "Chapinero Central",
                address: "Carrera 13 # 60-20",
                bedrooms: 1,
                bathrooms: 1,
                amenities: ["WiFi", "Cocina compartida"],
                images: [],
                status: "disponible",
                owner: owner._id,
                views: 10,
                featured: false,
            },
            {
                title: "Habitación amoblada en Chapinero",
                description:
                    "Habitación completamente amoblada con excelente ubicación.",
                propertyType: "habitacion",
                price: {
                    amount: 700000,
                    currency: "COP",
                    period: "monthly",
                },
                city: "Bogotá",
                locality: "Chapinero",
                neighborhood: "Chapinero Alto",
                address: "Calle 65 # 7-30",
                bedrooms: 1,
                bathrooms: 1,
                amenities: ["WiFi", "Amoblada", "Lavandería"],
                images: [],
                status: "disponible",
                owner: owner._id,
                views: 25,
                featured: true,
            },
            {
                title: "Apartamento moderno en Chapinero",
                description:
                    "Apartamento moderno con excelente iluminación y ubicación.",
                propertyType: "apartamento",
                price: {
                    amount: 1200000,
                    currency: "COP",
                    period: "monthly",
                },
                city: "Bogotá",
                locality: "Chapinero",
                neighborhood: "Chapinero Norte",
                address: "Carrera 11 # 72-15",
                bedrooms: 2,
                bathrooms: 1,
                amenities: ["Ascensor", "Parqueadero", "Balcón"],
                images: [],
                status: "disponible",
                owner: owner._id,
                views: 40,
                featured: true,
            },
            {
                title: "Apartamento familiar en Usaquén",
                description:
                    "Apartamento amplio ubicado en una zona tranquila de Usaquén.",
                propertyType: "apartamento",
                price: {
                    amount: 1500000,
                    currency: "COP",
                    period: "monthly",
                },
                city: "Bogotá",
                locality: "Usaquén",
                neighborhood: "Santa Bárbara",
                address: "Carrera 15 # 120-40",
                bedrooms: 2,
                bathrooms: 2,
                amenities: ["Ascensor", "Parqueadero", "Seguridad"],
                images: [],
                status: "disponible",
                owner: owner._id,
                views: 35,
                featured: false,
            },
            {
                title: "Casa amplia en Suba",
                description:
                    "Casa familiar con amplios espacios y buena ubicación.",
                propertyType: "casa",
                price: {
                    amount: 1800000,
                    currency: "COP",
                    period: "monthly",
                },
                city: "Bogotá",
                locality: "Suba",
                neighborhood: "Niza",
                address: "Calle 125 # 70-20",
                bedrooms: 3,
                bathrooms: 2,
                amenities: ["Patio", "Parqueadero", "Cocina integral"],
                images: [],
                status: "disponible",
                owner: owner._id,
                views: 50,
                featured: true,
            },
            {
                title: "Habitación económica en Suba",
                description:
                    "Habitación sencilla y cómoda en una zona residencial.",
                propertyType: "habitacion",
                price: {
                    amount: 500000,
                    currency: "COP",
                    period: "monthly",
                },
                city: "Bogotá",
                locality: "Suba",
                neighborhood: "La Campiña",
                address: "Carrera 90 # 145-10",
                bedrooms: 1,
                bathrooms: 1,
                amenities: ["WiFi", "Cocina compartida"],
                images: [],
                status: "disponible",
                owner: owner._id,
                views: 15,
                featured: false,
            },
            {
                title: "Apartaestudio en Teusaquillo",
                description:
                    "Apartaestudio moderno ideal para una persona o pareja.",
                propertyType: "apartaestudio",
                price: {
                    amount: 1000000,
                    currency: "COP",
                    period: "monthly",
                },
                city: "Bogotá",
                locality: "Teusaquillo",
                neighborhood: "La Soledad",
                address: "Carrera 24 # 40-15",
                bedrooms: 1,
                bathrooms: 1,
                amenities: ["Ascensor", "WiFi"],
                images: [],
                status: "disponible",
                owner: owner._id,
                views: 30,
                featured: false,
            },
            {
                title: "Apartamento en Kennedy",
                description:
                    "Apartamento cómodo ubicado cerca de comercio y transporte.",
                propertyType: "apartamento",
                price: {
                    amount: 900000,
                    currency: "COP",
                    period: "monthly",
                },
                city: "Bogotá",
                locality: "Kennedy",
                neighborhood: "Ciudad Kennedy",
                address: "Carrera 78 # 40-30",
                bedrooms: 2,
                bathrooms: 1,
                amenities: ["Zona infantil", "Seguridad"],
                images: [],
                status: "disponible",
                owner: owner._id,
                views: 20,
                featured: false,
            },
            {
                title: "Casa familiar en Engativá",
                description:
                    "Casa amplia para familias ubicada en una zona residencial.",
                propertyType: "casa",
                price: {
                    amount: 1500000,
                    currency: "COP",
                    period: "monthly",
                },
                city: "Bogotá",
                locality: "Engativá",
                neighborhood: "Normandía",
                address: "Carrera 72 # 53-25",
                bedrooms: 3,
                bathrooms: 2,
                amenities: ["Patio", "Garaje"],
                images: [],
                status: "disponible",
                owner: owner._id,
                views: 45,
                featured: false,
            },
            {
                title: "Apartaestudio moderno en Usaquén",
                description:
                    "Apartaestudio moderno ubicado cerca de restaurantes y zonas comerciales.",
                propertyType: "apartaestudio",
                price: {
                    amount: 1300000,
                    currency: "COP",
                    period: "monthly",
                },
                city: "Bogotá",
                locality: "Usaquén",
                neighborhood: "Cedritos",
                address: "Calle 140 # 12-50",
                bedrooms: 1,
                bathrooms: 1,
                amenities: ["Ascensor", "Gimnasio", "Seguridad"],
                images: [],
                status: "disponible",
                owner: owner._id,
                views: 55,
                featured: true,
            },
        ];

        const createdProperties = await Property.insertMany(
            properties
        );

        console.log(
            `${createdProperties.length} propiedades creadas correctamente`
        );

        process.exit(0);
    } catch (error) {
        console.error(
            "Error ejecutando propertySeed:",
            error
        );

        process.exit(1);
    }
};

propertySeed();