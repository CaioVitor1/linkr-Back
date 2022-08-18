import { commentRepository } from "../repository/commentRepository.js";

export async function addComment(req, res){

    try{
        const {postId, comment} = req.body;
        const userId = res.locals.user.id

        console.log(comment, postId, userId);

        await commentRepository.insertComment(comment, userId, postId);

        res.sendStatus(200);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}


export async function loadComments(req, res){
    try{
        const {postId} = req.params;

        console.log(postId);

        const {rows: comments} = await commentRepository.getComments(postId);

        if(!comments){
            res.sendStatus(404);
        }

        res.status(200).send(comments);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}