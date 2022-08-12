import connection from "../databases/postgres.js";

async function getTrendingRanking(){
    return connection.query(`select hashtag, count(hashtag) from hashtags group by hashtag order by count desc`);
}

async function getHashtagPosts(hashtag){
    

    return connection.query(`select posts.id, posts."userId" as "postId", posts.description , posts.url as "postUrl", users."name" as "userName", users.image as "userImage", likes.*  from posts inner join users on posts."userId" = users.id left join likes on posts.id = likes."postId" where posts.description like $1`, ['%#' + hashtag + '%']);
}

export const trendingRepository = {
    getTrendingRanking,
    getHashtagPosts
  };
  