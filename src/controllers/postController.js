
import connection from "../databases/postgres.js";
import urlMetadata from 'url-metadata';

export async function createPost(req, res) {
   try{
    const userId = res.locals.user.id;
    console.log("userId: " + userId);
    //const userId = 1;
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
    
    const {rows: posts} = await connection.query(`select users.id, posts.id AS "postId", posts."userId", users.name, users.image AS profile, posts.comment , posts.url, posts.title, posts.image, posts.description, count(likes."postId") as "likesCount" from posts inner join users on posts."userId" = users.id left join likes on posts.id = likes."postId" group by posts.id, users.id order by posts.id desc limit 20`);  

    const postsId = posts.map(post => post.postId);
    
    const {rows: postsLikes} = await connection.query(`select likes.*, users.name from likes inner join users ON likes."userId" = users.id where "postId" = ANY($1::int[])`, [postsId]);

    let joinPostsLikes = [...posts];

    for(let i=0;i<joinPostsLikes.length;i++){
        joinPostsLikes[i].likes = [];
        postsLikes.map(like => {
            if(like.postId === joinPostsLikes[i].postId){
                joinPostsLikes[i].likes.push({ id: like.id, userId: like.userId, postId: like.postId, name: like.name });
            }
        });
    }

    //console.log(joinPostsLikes);
    res.send(joinPostsLikes);
}catch(erro) {
    console.log(erro)
    return res.status(500).send("erro")
}
}