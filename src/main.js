// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';
import relativeTime from '~/helpers/relativeTime.js';

export default function (Vue, { router, head, isClient }) {
    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout);
    Vue.prototype.relativeTime = relativeTime;

    Vue.config.productionTip = false;
    Vue.config.devtools = process.isClient;
}
