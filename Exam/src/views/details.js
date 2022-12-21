import { deleteById, getById } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { getLikes, getOwnLikes, like } from "../api/likes.js";

const detailsTemplate = (album, hasUser, isOwner, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src=${album.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">0</span></div>
        ${albumControl(album, hasUser, isOwner, onDelete)}
        <!--Edit and Delete are only for creator-->
    </div>
</section>`;

function albumControl(album, hasUser, isOwner, onDelete) {
    if (hasUser == false) {
        return nothing;
    }

    if (isOwner) {
        return html`
        <div id="action-buttons">
            <a href="/edit/${album._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
        </div>`;
    }
}

export async function showDetails(ctx) {
    const id = ctx.params.id;

    const requests = [
        getById(id),
        getLikes(id)
    ]

    const hasUser = Boolean(ctx.user);

    if (hasUser) {
        requests.push(getOwnLikes(id, ctx.user._id));
    }

    const [album, like, hasLikes] = await Promise.all(requests);

    const isOwner = hasUser && ctx.user._id == album._ownerId;
    debugger;
    const canLike = !isOwner && hasLikes == 0;

    ctx.render(detailsTemplate(album, hasUser, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this album!');

        if (choice) {
            await deleteById(id);
            ctx.page.redirect('/catalog')
        }
    }

    async function onLike() {
        await like(id);
        ctx.page.redirect('/catalog/' + id);
    }
}