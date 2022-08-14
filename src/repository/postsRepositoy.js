import connection from "../databases/postgres.js";

async function insertNewPost(id, comment,url, metaDados) {
    return connection.query('INSERT INTO posts ("userId", comment, url, title, description, image) VALUES ($1, $2, $3, $4, $5, $6 )', [id, comment,url, metaDados.title, metaDados.description, metaDados.image]);
}

async function searchPost(url) {
    return connection.query(`SELECT * FROM posts WHERE url LIKE '%${url}'`);
}

async function insertHashtag(tag, searchPostId) {
    return connection.query('INSERT INTO hashtags (hashtag, "postId") VALUES ($1, $2)', [tag, searchPostId[0].id])
}

async function listPosts() {
    return connection.query(`SELECT users.id, posts.id AS postId, users.name, users.image AS profile, posts.comment , posts.url, posts.title, posts.image, posts.description
    FROM users JOIN posts ON users.id = posts."userId"
    ORDER BY postId DESC
    LIMIT 20;`);  
}

async function searchPostId(postId) {
    return connection.query('SELECT * FROM posts WHERE id = $1', [postId]);
}

async function deletingPost(postId) {
    return connection.query('DELETE FROM posts WHERE id = $1', [postId]);
}

async function deletingHashtags(postId){
    return connection.query('DELETE FROM hashtags WHERE "postId" = $1', [postId]);
}

async function updatingPost(updateComment,postId){
    return connection.query(`UPDATE posts SET "comment" = '${updateComment}' WHERE id = $1`, [postId])
}

export const postRepository = {
    insertNewPost,
    searchPost,
    insertHashtag,
    listPosts,
    searchPostId,
    deletingPost,
    deletingHashtags,
    updatingPost
  };
  