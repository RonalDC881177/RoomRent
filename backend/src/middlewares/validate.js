import AppError from "../errors/AppError.js";

const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = result.error.errors.map(
                (error) => error.message
            );

            return next(
                new AppError(errors.join(", "), 400)
            );
        }

        req.body = result.data;

        next();
    };
};

export default validate;