import Vue from "vue";
import App from "./App.vue";
import "@/assets/main.css";
import VueParse, { VueParseOptions } from "vue-parse";
import router from './router'
Vue.use(require('vue-moment'));

import "toastr/build/toastr.min.css";
import toastr from "toastr";
import vuetify from './plugins/vuetify';


toastr.options = {
    positionClass: "toast-bottom-right",
    timeOut: 2500,
    progressBar: true
};


Vue.config.productionTip = false;

// Vue.use<VueParseOptions>(VueParse, {
//     appId: 'andrews',
//     key: 'RAAsdfasdf1234',
//     serverURL: 'http://localhost:1337/parse',
//     onerror: e => toastr.error(`Error while querying data: ${e.message}`)
// });
Vue.use<VueParseOptions>(VueParse, {
    appId: 'WxC09d7OPGLJovzPTgaPufRq98PiwLQGXfLsfTJs',
    key: 'VJKNeYV0CsZ802fgTkbNNIiTX2naOVcd1oefdWrX',
    serverURL: 'https://andrewsapp-dev.back4app.io',
    onerror: e => toastr.error(`Error while querying data: ${e.message}`)
});
process.on('unhandledRejection', error => {
    console.error(error)
  })

new Vue({
    vuetify,
    router,
    render: h => h(App),
    async mounted() {
      // Prevent blank screen in Electron builds
      console.log(this.$parse.user
        )
      this.$router.push('/')
    }
  }).$mount('#app')
