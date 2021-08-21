import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import "./styles/app.scss";
import FirebaseMixin from "@/mixins/FirebaseMixin";
import firebase from "./FirebaseSetup";

firebase.auth().onAuthStateChanged(() => {
    const app = createApp(App).use(Quasar, quasarUserOptions).use(store).use(router);

    app.mixin(FirebaseMixin);

    app.mount('#app');
})