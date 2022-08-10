export async function validateToken(req, res, next) {
    try {
        /*
        console.log("está aqui na validação do token")
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');

        const chaveSecreta = process.env.JWT_SECRET;
        const {userId} = jwt.verify(token,chaveSecreta)
            if(!token || !userId) {
                return res.sendStatus(401);
            }
            console.log("o userId do token é: " + userId)
            res.locals.session = userId
           */
          const userId = 1;
          res.locals.session = userId
            next();
        }catch(erro){
            console.log(erro);
            res.sendStatus(401);
        }
}