import connection from "../databases/postgres.js";
import { followRepository } from "../repository/followRepository.js";

export async function createFollow(req, res) {
    try{
        const {profileId, follower} = req.body;
        if(profileId === follower) {
            return res.status(422).send("Os usuários são os mesmos")
        }
        const {rows: searchId} = await followRepository.lookingId(profileId, follower)
        if(searchId.length !== 2) {
            return res.status(404).send("Um dos usuários não existe!")
        }
        const {rows: lookingFollow} = await followRepository.lookFollow(profileId, follower)
      
        if(lookingFollow.length === 0) {
            const newFollow = await followRepository.insertFollow(profileId, follower)
            return res.status(200).send("amizade criada")
        } else{
            return res.status(422).send("A amizade já existe")
        }
        
        
    }catch(erro) {
        console.log(erro)
        return res.status(500).send("erro")
    }
}

export async function searchFollow(req, res) {
    try{
        const verifiedUser = res.locals.user
        const follower = verifiedUser.id;
        const {profileId} = req.params
        console.log(profileId, follower)
        
        const {rows: lookingFollow} = await  followRepository.lookFollow(profileId, follower)
        console.log(lookingFollow)
        if(lookingFollow.length !== 0) {
            return res.send(true)
        } else{
            return res.send(false)
        }
        
        //preciso fazer uma requisição para tabela de seguidores e ver se encontra amizade entre o usuário e o dono da página
    } catch(erro) {
        console.log(erro)
        return res.status(500).send("erro")
    }
}

export async function deleteFollow(req, res) {
    try{
        const verifiedUser = res.locals.user
        const follower = verifiedUser.id;
        const {profileId} = req.params
        console.log(follower, profileId)
        
        const {rows: lookingFollow} = await followRepository.lookFollow(profileId, follower)
       console.log(lookingFollow)
        if(lookingFollow.length !== 0) {
            const {rows: deleteFollow} = await followRepository.deletingFollow(profileId, follower)
            return res.status(204).send("Amizade deletada")
        } else{
            return res.status(422).send("Não existe essa amizade registrada")
        }
        
    }catch(erro) {
        console.log(erro)
        return res.status(500).send("erro")
    }
}

export async function searchAnyFollow(req, res) {
    try{
        const verifiedUser = res.locals.user
        const follower = verifiedUser.id;

        const {rows: searchfollow} = await followRepository.searchUnicFollow(follower)
        console.log(searchFollow.length)
        console.log(searchfollow)
        return res.status(200).send(searchfollow)
    }catch(erro) {
        console.log(erro)
        return res.status(500).send("erro")
    }
}