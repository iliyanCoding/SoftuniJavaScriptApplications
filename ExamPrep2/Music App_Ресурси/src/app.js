import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
//import { showCreate } from './views/addItem.js';
//import { showCatalog } from './views/catalog.js';
//import { showDetails } from './views/details.js';
//import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { updateNav } from './views/nav.js';
import { showRegister } from './views/register.js';

let main = document.querySelector('main');

showHome;
page(decorateCtx);
page('/', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/catalog', showCatalog);
page('/catalog/:id', showDetails);
page('/create', showCreate);

updateNav();
page.start();

async function decorateCtx(ctx, next){
    ctx.render = renderMain;
    ctx.updateNav = updateNav;
    
    const user = await getUserData();
    if (user){
        ctx.user = user;
    }

    next();
}

function renderMain(content){
    render(content, main);
}