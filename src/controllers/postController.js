
import connection from "../databases/postgres.js";
import urlMetadata from 'url-metadata';
import { postRepository } from "../repository/postsRepositoy.js";

export async function createPost(req, res) {
   try{
    console.log("chegou aqui")
    const verifiedUser = res.locals.user
    console.log(verifiedUser)

    const id = verifiedUser.id
    console.log(id);
   
    let {url, comment} = req.body
    console.log(id, url, comment)
    if(comment === undefined) {
        comment = ""
    }

    const metaDados =  await urlMetadata(url)
    
    // insert new post
     const newPost = await postRepository.insertNewPost(id, comment,url, metaDados)
    
     const {rows: searchPostId} = await postRepository.searchPost(url)  
    
    console.log(searchPostId)
    console.log(searchPostId[0].id)
    const hashtags = comment.split('#')
    const qtdHashtags = comment.split('#').length - 1;
    for(let i = 1; i <= qtdHashtags; i++) {
        let tag = hashtags[hashtags.length - i];
        let newHashtag = await postRepository.insertHashtag(tag, searchPostId)
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
    const {rows: posts} = await postRepository.listPosts()
    res.send(posts)
}catch(erro) {
    console.log(erro)
    return res.status(500).send("erro")
}
}

export async function deletepost(req, res) {
    try{
        const {postId} = req.params;
        const verifiedUser = res.locals.user
        console.log(verifiedUser)

        const id = verifiedUser.id

        const {rows: searchIdPost} = await postRepository.searchPostId(postId)  
            
        if(searchIdPost.length === 0) {
            return res.sendStatus(404)
        }

        if(searchIdPost[0].userId !== id) {
           return res.status(401).send("O post não pertence a esse usuário")
        }
        if(searchIdPost[0].userId === id) {
           
            const deletingUrl = await postRepository.deletingPost(postId)
            return res.status(204).send("Post deletado")
        }
        

    }catch(erro) {
        console.log(erro)
        return res.status(500).send("erro")
    }
}