export function validateSchema(schema) {
    return (req, res, next) => { 
        console.log("Chegou aqui na validação do Schema")
      const {error} = schema.validate(req.body, {abortEarly: false});
      if (error) {
        return res.status(422).send(error.details.map(detail => detail.message));
      }
  
      next();
    }
  }