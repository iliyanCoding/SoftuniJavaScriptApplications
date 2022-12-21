import { nothing } from '../lib.js';
import { html } from '../lib.js';
import { deleteById, getById } from '../util.js';

const detailsTemplate = (details, hasUser, isOwner, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${details.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${details.name}</h1>
                <h3>Artist: ${details.artist}</h3>
                <h4>Genre: ${details.genre}</h4>
                <h4>Price: ${details.price}</h4>
                <h4>Date: ${details.releaseDate}</h4>
                <p>Description: ${details.description}</p>
            </div>
            ${albumControl(details, hasUser, isOwner, onDelete)}
            <!-- Only for registered user and creator of the album-->
        </div>
    </div>
</section>`;

function albumControl(details, hasUser, isOwner, onDelete) {
    if (hasUser == false) {
        return nothing;
    }
    if (isOwner) {
        return html`
        <div class="actionBtn">
            <a href="/edit/${details._id}" class="edit">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
        </div>`;
    }
}

export async function showDetails(ctx) {
    const id = ctx.params.id;

    const details = await getById(id);

    const hasUser = Boolean(ctx.user);

    const isOwner = hasUser && ctx.user._id == details._ownerId;

    ctx.render(detailsTemplate(details, hasUser, isOwner, onDelete));

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this album');

        if(choice){
            await deleteById(id);
            ctx.page.redirect('/');
        }
    }

}