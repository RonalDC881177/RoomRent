import { z } from "zod";

export const createRoomieSchema = z.object({
    city: z
        .string()
        .trim()
        .min(2, "La ciudad es obligatoria"),

    locality: z
        .string()
        .trim()
        .min(2, "La localidad es obligatoria"),

    maxBudget: z
        .number()
        .positive("El presupuesto debe ser mayor a 0"),

    moveInDate: z
        .coerce
        .date()
        .refine(
            (date) => date >= new Date(),
            "La fecha de mudanza no puede ser anterior a hoy"
        ),

    description: z
        .string()
        .trim()
        .min(
            20,
            "La descripción debe tener al menos 20 caracteres"
        )
        .max(
            1000,
            "La descripción no puede superar los 1000 caracteres"
        ),

    preferences: z
        .array(z.string().trim())
        .optional()
        .default([]),
});

export const updateRoomieSchema =
    createRoomieSchema.partial();