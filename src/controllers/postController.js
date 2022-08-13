
import connection from "../databases/postgres.js";
import urlMetadata from 'url-metadata';
import { postRepository } from "../repository/postsRepositoy.js";

export async function createPost(req, res) {
   try{
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
            const deletingHashtags = await postRepository.deletingHashtags(postId)

            const deletingUrl = await postRepository.deletingPost(postId)
            return res.status(204).send("Post deletado")
        }
        

    }catch(erro) {
        console.log(erro)
        return res.status(500).send("erro")
    }
}

export async function updatePosts(req, res) {
    const {updateComment, url} = req.body
    const verifiedUser = res.locals.user
    if(updateComment === undefined) {
        updateComment = ""
    }
    const userId = verifiedUser.id
    const {rows: searchPostId} = await postRepository.searchPost(url) 
    
    if(searchPostId.length === 0) {
        return res.sendStatus(404)
    }
    let postId = searchPostId[0].id
    
    console.log(postId)
    // apagar todas as hashtags desse post
    const deleteHashtags = await postRepository.deletingHashtags(postId)

    //Atualizar a tabela de hashtags caso haja hashtags nesse novo comentário
    const hashtags = updateComment.split('#')
    const qtdHashtags = updateComment.split('#').length - 1;
    for(let i = 1; i <= qtdHashtags; i++) {
        let tag = hashtags[hashtags.length - i];
        let newHashtag = await postRepository.insertHashtag(tag, searchPostId)
        console.log(tag)
    }

    //inserir novo post
    const update = await postRepository.updatingPost(updateComment,postId)

    return res.status(200).send("Comentário atualizado")

}