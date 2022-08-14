import connection from '../databases/postgres.js';

async function getUserPagePosts(userId){

    return connection.query(`select users.id, posts.id AS "postId", posts."userId", users.name, users.image AS profile, posts.comment , posts.url, posts.title, posts.image, posts.description, count(likes."postId") as "likesCount" from posts inner join users on posts."userId" = users.id left join likes on posts.id = likes."postId" where posts."userId" = $1 group by posts.id, users.id order by posts.id desc`, [userId]);
    
}

async function getUsersByName(search){
    return connection.query(`select users.id, users."name", users.image from users where "name" like $1`, [search + '%']);
}

export const userPageRepository = {
    getUserPagePosts,
    getUsersByName
  };
  