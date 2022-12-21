import { html } from "../lib.js";
import { getAll } from "../util.js";

let catalogTemplate = (albums) => html`
<section id="catalogPage">
            <h1>All Albums</h1>
            ${albums.length == 0 ? html `
            <p>No Albums in Catalog!</p>` 
            : albums.map(cardTemplate)}

            <!--No albums in catalog-->
        </section>`;

const cardTemplate = (album) => html`
<div class="card-box">
    <img src=${album.image}>
        <div>
            <div class="text-center">
                <p class="name">${album.name}</p>
                <p class="artist">${album.artist}</p>
                <p class="genre">${album.genre}</p>
                <p class="price">${album.price}</p>
                <p class="date">${album.date}</p>
        </div>
        <div class="btn-group">
            <a href="/catalog/${album._id}" id="details">Details</a>
        </div>
</div>
</div>`;

export async function showCatalog(ctx){
    const albums = await getAll();
    ctx.render(catalogTemplate(albums));
}