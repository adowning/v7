import Vue from "vue";
import App from "./App.vue";
import "@/assets/main.css";
// import VueParse, { VueParseOptions } from "vue-parse";
import VueParse, { VueParseOptions } from "vue-parse";
import router from './router'
Vue.use(require('vue-moment'));
// import store from './store/';

import "toastr/build/toastr.min.css";
import toastr from "toastr";
import vuetify from './plugins/vuetify';
import { IpcMessageEvent, ipcRenderer as ipc, shell, WebviewTag } from 'electron';
import { init as initAuth } from './auth';

let wrapper: WebviewTag | null;


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
  // appId: 'WxC09d7OPGLJovzPTgaPufRq98PiwLQGXfLsfTJs',
  // key: 'VJKNeYV0CsZ802fgTkbNNIiTX2naOVcd1oefdWrX',
  // serverURL: 'https://andrewsapp-dev.back4app.io',
  appId: 'andrews_prod',
  key: 'JSAsdfasdf1234',
  serverURL: 'https://parser-parse.ashdevtools.com/parse',
  onerror: e => toastr.error(`Error while querying data: ${e.message}`)
});


process.on('unhandledRejection', error => {
  console.error(error)
})


onload = async () => {

  // Get wrapper element; stop here if this fails.
  wrapper = document.querySelector('webview#wrapper');
  if (!wrapper) { return; }

  // Attach a (very) basic context menu.
  require('electron-context-menu')({ window: wrapper });

  wrapper.addEventListener('console-message', (e) => {
    // tslint:disable-next-line:no-console
    console.log('Guest logged: "' + e.message + '".');
  });

  // Events.
  wrapper.addEventListener('new-window', (e) => {
    // External links do not work by default. Need to handle.
    shell.openExternal(e.url);
  });

  // IPC.
  wrapper.addEventListener('ipc-message', (e) => {
    if (!wrapper) { return; }

    switch (e.channel) {

      case 'unread-count-changed':

        wrapper.send('get-unread-inbox-emails');
        break;

      case 'unread-inbox-emails':

        ipc.send('unread-count-changed', e.args[0]);
        break;

      case 'setup-completed':

        wrapper.send('get-unread-inbox-emails');
        ipc.send('gmail-initialized', e.args);
        break;

      default:

        // tslint:disable-next-line:no-console
        console.log('Received unhandled ipc-message via event listener: "' + e.channel + '"');
        break;

    }

  });

  // Wait for wrapper element to get ready.
  wrapper.addEventListener('dom-ready', () => {
    if (!wrapper) { return; }

    var url = 'https://www.googleapis.com/plus/v1/people/me?access_token={access_token}';

    // wrapper.openDevTools();

  });

};

// ipc.on('open-wrapper-devtools', (e: IpcMessageEvent, ...args: any[]): void => {
//   if (wrapper) { wrapper.openDevTools(); }
// });

// store.dispatch('initApp').then(() => {
new Vue({
  vuetify,
  router,
  // store,
  render: h => h(App),
  async mounted() {
    // // Prevent blank screen in Electron builds
    // try{
    //  const user = await  Parse.User.current()
    if (this.$parse.user) {
      this.$router.push('/')
    } else {
      this.$router.push('/login ')

    }

  }
}).$mount('#app')

//   initAuth(store);
// }, (err) => {
//   console.log('Error wile initializing', err);
//   // TODO: Warn user but should not occur...
// });



