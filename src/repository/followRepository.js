import connection from "../databases/postgres.js";

async function lookingId(profileId, follower) {
    return connection.query('SELECT * FROM users WHERE id = $1 OR id = $2', [profileId, follower])
}

async function lookFollow(profileId, follower) {
    return connection.query('SELECT * FROM followers WHERE "profileId" = $1 AND follower = $2', [profileId, follower])
}

async function insertFollow(profileId, follower) {
    return connection.query('INSERT INTO followers ("profileId", "follower") VALUES ($1, $2)', [profileId, follower])
}

async function deletingFollow(profileId, follower) {
    return connection.query('DELETE FROM followers WHERE "profileId" = $1 AND follower = $2', [profileId, follower])
}

async function searchUnicFollow(follower) {
    return connection.query('SELECT * FROM followers WHERE follower = $1', [follower])
}
export const followRepository = {
    lookingId,
    lookFollow,
    insertFollow, 
    deletingFollow,
    searchUnicFollow
}