
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './routes';
import axios from 'axios';
import { authService } from './services/auth.service';
import './style.css';
import Snackbar from './components/snackbar.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faTrash, faEdit, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

const token = authService.getToken();
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


library.add(faUser, faTrash, faEdit, faPlus, faEye);
const app = createApp(App);
app.use(router);
app.component('Snackbar', Snackbar);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');

