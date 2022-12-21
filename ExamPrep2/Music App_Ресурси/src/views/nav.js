import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";
import { logout } from "../api/user.js";
import {showHome} from "./home.js"


let navParent = document.querySelector('header');

export async function updateNav() {
    let user = Boolean(await getUserData());

    let navTemplate = (user, onLogout) => html`
    <nav>
                <img src="./images/headphones.png">
                <a href="/">Home</a>
                <ul>
                    <!--All user-->
                    <li><a href="/catalog">Catalog</a></li>
                    <li><a href="/search">Search</a></li>
                    <!--Only guest-->
                    ${!user ? html`
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>` : html` 
                    <li><a href="/create">Create Album</a></li>
                    <li><a @click=${onLogout} href="javascript:void(0)">Logout</a></li>`}
                    <!--Only user-->
                </ul>
            </nav>`;

    render(navTemplate(user, onLogout), navParent);
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}