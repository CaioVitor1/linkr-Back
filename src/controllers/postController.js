
import connection from "../databases/postgres.js";

export async function createPost(req, res) {
   try{
    const userId = res.locals.session
    let {url, description} = req.body
    console.log(userId, url, description)
    if(description === undefined) {
        description = ""
    }
    const newPost = await connection.query('INSERT INTO posts ("userId", description, url) VALUES ($1, $2, $3)', [userId, description,url]);
    
    const {rows: searchPostId} = await connection.query(`SELECT * FROM posts WHERE url LIKE '%${url}'`);  
    console.log(searchPostId)
    console.log(searchPostId[0].id)
    const hashtags = description.split('#')
    const qtdHashtags = description.split('#').length - 1;
    for(let i = 1; i <= qtdHashtags; i++) {
        let tag = hashtags[hashtags.length - i];
        let newHashtag = await connection.query('INSERT INTO hashtags (hashtag, "postId") VALUES ($1, $2)', [tag, searchPostId[0].id])
        
        
        console.log(newHashtag)
    }
    

    return res.status(200).send("Novo post e hashtag adicionados")
   }catch(erro) {
    console.log(erro)
    return res.status(500).send("erro")
   }
    
}

export async function getPosts(req, res) {
try {
    const {rows: posts} = await connection.query(`SELECT users.id, users.name, users.image, posts.description , posts.url
    FROM users JOIN posts ON users.id = posts."userId"
    LIMIT 20;`);  
}catch(erro) {

}
}