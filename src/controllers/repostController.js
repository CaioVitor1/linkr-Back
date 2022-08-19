import connection from "../databases/postgres.js";

export async function creatRepost(req, res) {
    try{
        const {userId, postId} = req.body;
        console.log(userId, postId)
        const newRepost = await connection.query('INSERT INTO repost ("userId", "postId") VALUES ($1, $2)', [userId, postId])
        return res.status(200).send("repost inserido na tabela")

    }catch(erro) {
        console.log(erro)
        return res.status(500).send("erro")
    }
}