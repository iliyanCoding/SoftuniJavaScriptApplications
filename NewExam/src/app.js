import { render, page } from "./lib.js";
import { getUserData } from "./util.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { updateNav } from "./views/nav.js";
import { showRegister } from "./views/register.js";

const main = document.querySelector('main');

//document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);


updateNav();
page.start();

function decorateContext(ctx, next){
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    const user = getUserData();
    if(user){
        ctx.user = user;
    }
    
    next();
}

function renderMain(content){
    render(content, main);
}




