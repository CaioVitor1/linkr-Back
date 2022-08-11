import connection from '../databases/postgres.js';

async function getUserPagePosts(userId){

    return connection.query(`select posts.id, posts."userId" as "userId", posts.description , posts.url as "postUrl", users."name" as "userName", users.image as "userImage", likes.*  from posts inner join users on posts."userId" = users.id left join likes on posts.id = likes."postId" where posts."userId" = $1`, [userId]);
    
}


export const userPageRepository = {
    getUserPagePosts
  };
  