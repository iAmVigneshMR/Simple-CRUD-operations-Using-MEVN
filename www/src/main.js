import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import '@mdi/font/css/materialdesignicons.css'
// import Vuetify from 'vuetify/lib'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faUserSecret);
library.add(faTrash);
library.add(faPenToSquare);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(Vuetify);

// export default new Vuetify({
//   icons: {
//     iconfont: 'mdi', // default - only for display purposes
//   },
// })

new Vue({
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app')
