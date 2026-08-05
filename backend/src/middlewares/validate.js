import AppError from "../errors/AppError.js";

const validate = (schema, source = "body") => {
    return (req, res, next) => {

        const result = schema.safeParse(req[source]);

        if (!result.success) {
            const errors = result.error.issues.map(
                (issue) => issue.message
            );

            return next(
                new AppError(errors.join(", "), 400)
            );
        }

        Object.assign(req[source], result.data);

        next();
    };
};

export default validate;