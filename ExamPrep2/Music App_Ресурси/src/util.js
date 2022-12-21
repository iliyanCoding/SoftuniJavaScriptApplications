import { get, post, del, put } from './api/api.js';

export async function getUserData(){
    let user = JSON.parse(sessionStorage.getItem('userData'));
    return user;
}

export async function setUserData(data){
    sessionStorage.setItem("userData", JSON.stringify(data));
}

export async function clearUserData(){
    sessionStorage.removeItem("userData");
}

export async function getAll(){
    return get("/data/albums?sortBy=_createdOn%20desc&distinct=name");
}

export async function createAlbum(albumData){
    return post('/data/albums', albumData)
}

export async function getById(id){
    return get('/data/albums/' + id);
}

export function createSubmitHandler(callback){
    return function(event){
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        callback(data);
    }
}

export async function editAlbum(id, albumData){
    return put('/data/pets/' + id, albumData);
}

export async function deleteById(id){
     return del('/data/albums/' + id);
}