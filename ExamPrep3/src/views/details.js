import { nothing, html } from "../lib.js";
import { deleteById, getById } from "../api/data.js";

const detailsTemplate = (shoe, hasUser, isOwner, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
            <img src=${shoe.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p>Brand: <span id="details-brand">${shoe.bramd}</span></p>
            <p>
                Model: <span id="details-model">${shoe.model}</span>
            </p>
            <p>Release date: <span id="details-release">${shoe.release}</span></p>
            <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
            <p>Value: <span id="details-value">${shoe.value}</span></p>
        </div>
        ${shoeControl(shoe, hasUser, isOwner, onDelete)}
    </div>
</section>`;

function shoeControl(shoe, hasUser, isOwner, onDelete) {
    if (hasUser == false) {
        return nothing;
    }
    if (isOwner) {
        return html`
        <div id="action-buttons">
            <a href="/edit/${shoe._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
        </div>`;
    }
}

export async function showDetails(ctx) {
    const id = ctx.params.id;

    const request = getById(id);

    const hasUser = Boolean(ctx.user);

    const shoe = await request;

    const isOwner = hasUser && ctx.user._id == shoe._ownerId;

    ctx.render(detailsTemplate(shoe, hasUser, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this shoe!');

        if (choice) {
            await deleteById(id);
            ctx.page.redirect('/');
        }
    }
}