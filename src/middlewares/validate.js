const Boom = require("@hapi/boom")

module.exports = (scheme) => {
  return async (req, res, next) => {
    
    let result = await scheme.validate(req.body);

    if (result.error) {
    //   next(result.error);
      const boomError = Boom.badRequest(result.error.details[0].message);
    
      // Aquí puedes formatear la respuesta como quieras
      res.status(boomError.output.statusCode).json({
        error: boomError.output.payload.error,
        msg: boomError.output.payload.message
      });
    } else {
      next();
    }
  };
};
