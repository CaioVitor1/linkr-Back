import { trendingRepository } from '../repository/trendingRepository.js';
import { likesRepository } from '../repository/likesRepository.js';
import joi from 'joi';
import connection from '../databases/postgres.js';

export async function trendingRanking(req, res){
    try{

        const trending = await trendingRepository.getTrendingRanking();

        if(trending.rowCount === 0){
            return res.sendStatus(404);
        }

        res.status(200).send(trending.rows);

    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

export async function hashtagPosts(req, res){
    try{
        const { hashtag } = req.params;
    
        const {rows: posts} = await trendingRepository.getHashtagPosts(hashtag);

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
        res.sendStatus(500);
    }
}
