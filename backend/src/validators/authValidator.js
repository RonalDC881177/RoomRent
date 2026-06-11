import { z } from "zod";

export const loginSchema = z.object({
    identifier: z
        .string()
        .min(3, "Debe ingresar email o username"),

    password: z
        .string()
        .trim()
        .min(1, "La contraseña es obligatoria")
});