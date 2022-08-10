import connection from '../databases/postgres.js';

export async function trendingRanking(req, res){
    try{

        const trending = await connection.query(`select hashtag, count(hashtag) from hashtags group by hashtag order by count desc`);

        if(trending.rowCount === 0){
            return res.sendStatus(404);
        }

        let trendingArr = [];
        for(let i=0;i<trending.length;i++){
            trendingArr.push({ hashtag: trending[i].hashtag });
        }

    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}