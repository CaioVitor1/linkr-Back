import connection from "../databases/postgres.js";


async function getPostsLikes(postsId){

    return connection.query(`select likes.*, users.name from likes inner join users ON likes."userId" = users.id where "postId" = ANY($1::int[])`, [postsId]);
}




export const likesRepository = {
    getPostsLikes
  };
  