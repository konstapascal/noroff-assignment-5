import { createApp } from 'vue';

import App from './App.vue';

import store, { key } from './store';
import router from './router';

import './css/tailwind.css';

createApp(App).use(store, key).use(router).mount('#app');
