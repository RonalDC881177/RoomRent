import { z } from "zod";
import {
    PROPERTY_TYPES,
    PRICE_PERIODS,
    PROPERTY_STATUS,
    DEFAULT_CURRENCY,
    DEFAULT_PERIOD,
    DEFAULT_STATUS
} from "../constants/propertyConstants.js";

export const createPropertySchema = z.object({
    title: z
        .string()
        .trim()
        .min(5, "El título debe tener mínimo 5 caracteres")
        .max(100, "El título no puede superar 100 caracteres"),

    description: z
        .string()
        .trim()
        .min(20, "La descripción debe tener mínimo 20 caracteres")
        .max(2000, "La descripción es demasiado larga"),

    propertyType: z.enum(
        PROPERTY_TYPES,
        {
            errorMap: () => ({
                message: "Tipo de propiedad inválido",
            }),
        }
    ),

    price: z.object({
        amount: z
            .number()
            .positive("El precio debe ser mayor a 0"),

        currency: z
            .string()
            .default(DEFAULT_CURRENCY),

        period: z.enum(
            PRICE_PERIODS,
        ).default(DEFAULT_PERIOD),
    }),

    city: z
        .string()
        .trim()
        .min(2, "La ciudad es obligatoria"),

    locality: z
        .string()
        .trim()
        .optional(),

    neighborhood: z
        .string()
        .trim()
        .min(2, "El barrio es obligatorio"),

    address: z
        .string()
        .trim()
        .optional(),

    bedrooms: z
        .number()
        .int()
        .min(0, "Habitaciones inválidas")
        .max(50)
        .optional(),

    bathrooms: z
        .number()
        .int()
        .min(0, "Baños inválidos")
        .max(20)
        .optional(),

    amenities: z
        .array(z.string())
        .optional(),

    images: z
        .array(
            z.string().url()
        )
        .min(
            1,
            "Debe incluir al menos una imagen"
        )
        .optional()
});

export const updatePropertySchema = createPropertySchema.partial();

export const getPropertiesQuerySchema = z.object({
    city: z
        .string()
        .trim()
        .optional(),

    locality: z
    .string()
    .trim()
    .optional(),

    propertyType: z.enum(
        PROPERTY_TYPES
    )
        .optional(),

    status: z.enum(
        PROPERTY_STATUS
    )
        .optional(),

    minPrice: z
        .coerce.number()
        .positive("El precio mínimo debe ser mayor a 0")
        .optional(),

    maxPrice: z
        .coerce.number()
        .positive("El precio máximo debe ser mayor a 0")
        .optional(),

    bedrooms: z
        .coerce.number()
        .int()
        .min(0, "Habitaciones inválidas")
        .optional(),

    bathrooms: z
        .coerce.number()
        .int()
        .min(0, "Baños inválidos")
        .optional(),
    page: z
        .coerce
        .number()
        .int()
        .min(1, "La pagina debe ser mayor a 0")
        .default(1),
    limint: z
        .coerce
        .number()
        .int()
        .min(1, "El limite debe ser mayor a 0")
        .default(10),

})
export const getPropertyByIdSchema = z.object({
    id: z.string().trim().min(1, "El id es obligatorio")
});