import { getUserData } from "../util.js";

let host = 'http://localhost:3030';

async function request(method, url, data){
    let options = {
        method,
        headers: {}
    };

    if (data){
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    let user = await getUserData();

    if (user){
        options.headers["X-Authorization"] = user.accessToken;
    }

    try{
        let responce = await fetch(host + url, options);

        if (responce.status === 204){
            return responce;
        }

        let data = await responce.json();

        if (!responce.ok){
            throw new Error(data.message);
        }

        return data;
    }
    catch (er){
        alert(er.message)
        throw er;
    }
}

export let get = request.bind(null, 'get');
export let post = request.bind(null, 'post');
export let put = request.bind(null, 'put');
export let del = request.bind(null, 'delete');