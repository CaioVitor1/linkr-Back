import connection from "../databases/postgres.js";

export async function createLike(req, res) {
  const { postId } = req.body;
  const { user } = res.locals;
  try {
    await connection.query(
      `INSERT INTO likes ("userId", "postId") VALUES ($1, $2)`,
      [user.id, postId]
    );

    res.send("Like inserted");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function deleteLike(req, res) {
  const { postId } = req.body;
  const { user } = res.locals;
  try {
    await connection.query(
      `DELETE FROM likes WHERE "postId"=$1 AND "userId"=$2`,
      [postId, user.id]
    );

    res.send("Like deleted");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

/* export async function getLikes(req, res) {
  const { postId } = req.body;
  const { user } = res.locals;
  try {
    const { rows: likes } = await connection.query(`
    SELECT likes."postId",COUNT(likes."postId")::INTEGER AS "likesCount",
    json_agg(users.name) AS "whoLiked" 
    FROM likes
    JOIN users ON likes."userId" = users.id
    GROUP BY likes."postId" 
    `);

    res.send(likes);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
} */
