import { trendingRepository } from '../repository/trendingRepository.js';
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
    
        const postsJoin = await trendingRepository.getHashtagPosts(hashtag);

        if(postsJoin.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.status(200).send(postsJoin.rows);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}
