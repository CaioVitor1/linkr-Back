import connection from '../databases/postgres.js';

export async function trendingRanking(req, res){
    try{

        const trending = await connection.query(`select hashtag, count(hashtag) from hashtags group by hashtag order by count desc`);

        if(trending.rowCount === 0){
            return res.sendStatus(404);
        }

        res.status(200).send(trending.rows);

    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}