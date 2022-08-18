import connection from "../databases/postgres.js";


async function insertComment(comment, userId, postId){
    connection.query(`insert into comments (comment,"userId", "postId") values ($1, $2, $3)`, [comment, userId, postId]);
}


async function getComments(postId){
    return connection.query(`select users.name, users.image, comments.* from comments inner join users on comments."userId" = users.id where "postId" = $1`, [postId]);
}



export const commentRepository = {
    insertComment,
    getComments
  };
  