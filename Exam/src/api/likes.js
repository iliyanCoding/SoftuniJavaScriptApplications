import { get, post } from "./api.js";

export async function like(albumId){
    return post('/data/likes', {albumId});
}

export async function getLikes(albumId){
    return get(`data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`)
}

export async function getOwnLikes(albumId, userId){
    return get(`data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}