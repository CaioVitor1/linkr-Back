
import connection from "../databases/postgres.js";
import urlMetadata from 'url-metadata';

export async function createPost(req, res) {
   try{
    //const userId = res.locals.session
    const userId = 1;
    let {url, comment} = req.body
    console.log(userId, url, comment)
    if(comment === undefined) {
        comment = ""
    }

    const metaDados =  await urlMetadata(url)
    
     const newPost = await connection.query('INSERT INTO posts ("userId", comment, url, title, description, image) VALUES ($1, $2, $3, $4, $5, $6 )', [userId, comment,url, metaDados.title, metaDados.description, metaDados.image]);
    
    const {rows: searchPostId} = await connection.query(`SELECT * FROM posts WHERE url LIKE '%${url}'`);  
    console.log(searchPostId)
    console.log(searchPostId[0].id)
    const hashtags = comment.split('#')
    const qtdHashtags = comment.split('#').length - 1;
    for(let i = 1; i <= qtdHashtags; i++) {
        let tag = hashtags[hashtags.length - i];
        let newHashtag = await connection.query('INSERT INTO hashtags (hashtag, "postId") VALUES ($1, $2)', [tag, searchPostId[0].id])
        
        
        console.log(tag)
    }
    

    return res.status(200).send("Novo post e hashtag adicionados")
   }catch(erro) {
    console.log(erro)
    return res.status(500).send("erro")
   }
    
}

export async function getPosts(req, res) {
try {
    
    const {rows: posts} = await connection.query(`SELECT users.id, posts.id AS postId, users.name, users.image AS profile, posts.comment , posts.url, posts.title, posts.image, posts.description
    FROM users JOIN posts ON users.id = posts."userId"
    ORDER BY postId DESC
    LIMIT 20;`);  
    res.send(posts)
}catch(erro) {
    console.log(erro)
    return res.status(500).send("erro")
}
}