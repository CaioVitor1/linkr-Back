import connection from "../databases/postgres.js";

export async function createLike(req, res) {
  const { idUser, postid} = req.body;
  const { user } = res.locals;
  try {
    console.log(idUser, postid)
    await connection.query(
      `INSERT INTO likes ("userId", "postId") VALUES ($1, $2)`,
      [idUser, postid]
    );
    
    return res.send("Like inserted");
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function deleteLike(req, res) {
  const { idUser, postid } = req.body;
  const { user } = res.locals;
  console.log("chegou aqui")
  try {
    const {rows: searchLike} = await connection.query(`select * from likes where "postId" = '${postid}' AND "userId" = '${idUser}'`)
    
    const id = searchLike[0].id
    console.log(id)
    
    await connection.query(
      `DELETE FROM likes WHERE id = ${id}
      
    `); 

    return res.send("Like deleted");
  } catch (error) {
    console.error(error);
   return  res.sendStatus(500);
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
