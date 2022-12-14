import { userPageRepository } from '../repository/userPageRepository.js'
import { likesRepository } from '../repository/likesRepository.js';
import connection from '../databases/postgres.js';

export async function userPagePosts(req, res){
    try{
        const { id } = req.params;

        const {rows: posts} = await userPageRepository.getUserPagePosts(id);

        if(!posts) {
            return res.sendStatus(404);
        }

        const postsId = posts.map(post => post.postId);
    
        const {rows: postsLikes} = await likesRepository.getPostsLikes(postsId);

        const { rows: commentsCount } = await connection.query(`select "postId", count(id) from comments where "postId" = ANY($1::int[]) group by "postId"`, [postsId]);

        let joinPostsLikes = [...posts];

        for(let i=0;i<joinPostsLikes.length;i++){
            joinPostsLikes[i].likes = [];
            joinPostsLikes[i].commentsCount = 0;
            postsLikes.map(like => {
                if(like.postId === joinPostsLikes[i].postId){
                    joinPostsLikes[i].likes.push({ id: like.id, userId: like.userId, postId: like.postId, name: like.name });
                }
                commentsCount.map(post => {
                    if(post.postId === joinPostsLikes[i].postId){
                        joinPostsLikes[i].commentsCount = post.count;
                    }
                  });
            });
        }

        res.status(200).send(joinPostsLikes);

    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

export async function searchUserByName(req, res){
    try{
        const search = req.query.search;
        const verifiedUser = res.locals.user
        const userId = verifiedUser.id
        
        // preciso saber qual usuário está logado através do token
        const {rows: listUsersMatch} = await userPageRepository.getUsersByName(search, userId);

        const {rows: listEveryUser} = await connection.query(`select users.id, users."name", users.image from users where "name" like $1`, [search + '%'])
        console.log(listUsersMatch)
        console.log(listEveryUser)

        if(listEveryUser.length === 0){
            return res.status(200).send([]);
        }
         if(listUsersMatch.length === 0) {
            return res.status(200).send(listEveryUser)
         }
        if(listUsersMatch.length === 1) {
            console.log("tá aqui no 1")
            for(let i = 0; i < listEveryUser.length; i++) {
                if(listUsersMatch[0].id !== listEveryUser[i].id){
                    listUsersMatch.push(listEveryUser[i])
                }
            }
            return res.status(200).send(listUsersMatch); 
        }

        if(listUsersMatch.length >= 2) {
            console.log("tá aqui no 2")
            for(let i = 0; i < listEveryUser.length; i++) {
                for(let j = 0; j < listUsersMatch.length; j++) {
                    if(listEveryUser[i].id !== listUsersMatch[j].id) {
                        listUsersMatch.push(listEveryUser[i])
                        
                    }
                }
                
            } return res.status(200).send(listUsersMatch); 
        }
        return res.status(200).send(listUsersMatch);  
        
    
     
        
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

