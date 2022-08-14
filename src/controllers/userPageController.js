import { userPageRepository } from '../repository/userPageRepository.js'
import { likesRepository } from '../repository/likesRepository.js';

export async function userPagePosts(req, res){
    try{
        const { id } = req.params;

        const {rows: posts} = await userPageRepository.getUserPagePosts(id);

        if(!posts) {
            return res.sendStatus(404);
        }

        const postsId = posts.map(post => post.postId);
    
        const {rows: postsLikes} = await likesRepository.getPostsLikes(postsId);

        let joinPostsLikes = [...posts];

        for(let i=0;i<joinPostsLikes.length;i++){
            joinPostsLikes[i].likes = [];
            postsLikes.map(like => {
                if(like.postId === joinPostsLikes[i].postId){
                    joinPostsLikes[i].likes.push({ id: like.id, userId: like.userId, postId: like.postId, name: like.name });
                }
            });
        }

        res.status(200).send(joinPostsLikes);

    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

export async function searchUserByName(req, res){
    try{
        const search = req.query.search;

        const listUsers = await userPageRepository.getUsersByName(search);

        if(listUsers.rowCount === 0){
            return res.status(200).send([]);
        }
        console.log(listUsers.rows);
        res.status(200).send(listUsers.rows);
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

