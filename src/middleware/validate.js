const { ValidationError } = require('../shared/errors');

function validate(schema, source = 'body') {
  return (req, res, next) => {
    const data = req[source];
    const result = schema.safeParse(data);

    if (!result.success) {
      const errors = result.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return next(new ValidationError(errors));
    }

    req[source] = result.data;
    next();
  };
}

module.exports = validate;
