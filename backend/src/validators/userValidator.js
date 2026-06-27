import { z } from "zod";

export const createUserSchema = z.object({
    name: z
        .string()
        .min(3, "El nombre debe tener mínimo 3 caracteres")
        .max(100, "El nombre no puede superar 100 caracteres"),

    username: z
        .string()
        .trim()
        .toLowerCase()
        .min(3, "El username debe tener mínimo 3 caracteres")
        .max(30, "El username no puede superar 30 caracteres")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "El username solo puede contener letras, números y guiones bajos"
        ),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Debe ingresar un correo válido"),

    password: z
        .string()
        .min(8, "La contraseña debe tener mínimo 8 caracteres")
        .max(100, "La contraseña es demasiado larga"),

    role: z.enum(
        ["arrendador", "arrendatario"]
    ).optional()
});