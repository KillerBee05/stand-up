import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/fonts.css'
require('@/assets/fonts.css');
import firebase from 'firebase'
import './components/FirebaseInit'
import VCalendar from 'v-calendar';
import VueSweetalert2 from 'vue-sweetalert2';
import linkify from 'vue-linkify'

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc'
});
Vue.directive('linkified', linkify);

Vue.use(VueSweetalert2);

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(user => {
  if(!app){
    app = new Vue({
      render: h => h(App),
      router,
    }).$mount('#app')
  }
})
