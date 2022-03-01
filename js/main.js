import { router } from "./router.js";
import bookApp from "./views/book-app.cmp.js";
import appHeader from "./cmps/app-header.cmps.js";
import appFooter from "./cmps/app-footer.cmps.js";

const options = {
    template: `
            <section>
                <app-header></app-header>
                <!-- <book-app class="book-app"></book-app> -->
                <router-view></router-view>
                <app-footer></app-footer>
            </section>
    `,
    components: {
        bookApp,
        appHeader,
        appFooter,
    }
};

const app = Vue.createApp(options);
app.use(router);
app.mount('#app');