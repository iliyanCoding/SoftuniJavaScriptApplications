import { del, get, post, put } from "./api.js";

export async function getAll(){
    return get('data/shoes?sortBy=_createdOn%20desc');
}

export async function getById(id){
    return get('data/shoes/' + id);
}

export async function deleteById(id){
    return del('data/shoes/' + id);
}

export async function createShoe(shoeData){
    return post('data/shoes', shoeData);
}

export async function editShoe(id, shoeData){
    return put('data/shoes/' + id, shoeData);
}