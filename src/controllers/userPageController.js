import { userPageRepository } from '../repository/userPageRepository.js'

export async function userPagePosts(req, res){
    try{
        const { id } = req.params;

        console.log(id);

        const userPagePosts = await userPageRepository.getUserPagePosts(id);


        if(userPagePosts.rowCount === 0) {
            return res.sendStatus(404);
        }

        res.status(200).send(userPagePosts.rows);

    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

export async function searchUserByName(req, res){
    try{
        const search = req.query.search;

        const listUsers = await userPageRepository.getUsersByName(search);

        if(listUsers.rowCount === 0){
            return res.status(200).send([]);
        }

        console.log(listUsers.rows);
        res.status(200).send(listUsers.rows);
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

