import connection from "../databases/postgres.js";

export async function createFollow(req, res) {
    try{
        const {profileId, follower} = req.body;
        if(profileId === follower) {
            return res.status(422).send("Os usuários são os mesmos")
        }
        const {rows: searchId} = await connection.query('SELECT * FROM users WHERE id = $1 OR id = $2', [profileId, follower])
        if(searchId.length !== 2) {
            return res.status(404).send("Um dos usuários não existe!")
        }
        const {rows: lookingFollow} = await  connection.query('SELECT * FROM followers WHERE "profileId" = $1 AND follower = $2', [profileId, follower])
      
        if(lookingFollow.length === 0) {
            const newFollow = await connection.query('INSERT INTO followers ("profileId", "follower") VALUES ($1, $2)', [profileId, follower])
            return res.status(200).send("amizade criada")
        } else{
            return res.status(422).send("A amizade já existe")
        }
        
        
    }catch(erro) {
        console.log(erro)
        return res.status(500).send("erro")
    }
}

export async function searchFollow(req, res) {
    try{
        const verifiedUser = res.locals.user
        const follower = verifiedUser.id;
        const {profileId} = req.params
        console.log(follower, profileId)
        
        const {rows: lookingFollow} = await  connection.query('SELECT * FROM followers WHERE "profileId" = $1 AND follower = $2', [profileId, follower])
        if(lookingFollow.length !== 0) {
            return res.send("true")
        } else{
            return res.send("false")
        }
        
        //preciso fazer uma requisição para tabela de seguidores e ver se encontra amizade entre o usuário e o dono da página
    } catch(erro) {
        console.log(erro)
        return res.status(500).send("erro")
    }
}

export async function deleteFollow(req, res) {
    try{
        const verifiedUser = res.locals.user
        const follower = verifiedUser.id;
        const {profileId} = req.params
        console.log(follower, profileId)
        
        const {rows: lookingFollow} = await  connection.query('SELECT * FROM followers WHERE "profileId" = $1 AND follower = $2', [profileId, follower])
       console.log(lookingFollow)
        if(lookingFollow.length !== 0) {
            const {rows: deleteFollow} = await  connection.query('DELETE FROM followers WHERE "profileId" = $1 AND follower = $2', [profileId, follower])
            return res.status(204).send("Amizade deletada")
        } else{
            return res.status(422).send("Não existe essa amizade registrada")
        }
        
    }catch(erro) {
        console.log(erro)
        return res.status(500).send("erro")
    }
}