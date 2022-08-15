import connection from "../databases/postgres.js";

async function getTrendingRanking(){
    return connection.query(`select hashtag, count(hashtag) from hashtags group by hashtag order by count desc limit 10`);
}

async function getHashtagPosts(hashtag){
    

    return connection.query(`select users.id, posts.id AS "postId", posts."userId", users.name, users.image AS profile, posts.comment , posts.url, posts.title, posts.image, posts.description, count(likes."postId") as "likesCount", "postsHashtags".hashtag from posts inner join users on posts."userId" = users.id left join likes on posts.id = likes."postId" inner join (select hashtags."postId" as "postId", hashtags.id, hashtag from hashtags group by "postId", hashtags.id) as "postsHashtags" on posts.id = "postsHashtags"."postId" where "postsHashtags".hashtag = $1 group by posts.id, users.id, "postsHashtags".hashtag order by posts.id desc`, [hashtag]);
}


export const trendingRepository = {
    getTrendingRanking,
    getHashtagPosts
  };
  