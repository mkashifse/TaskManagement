import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa'
import colors from 'vuetify/lib/util/colors'
import { VDatePicker } from 'vuetify/labs/VDatePicker'



const vuetify = createVuetify({
  components:{
    ...components,
    VDatePicker
  },
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.blue.darken3, // #E53935
          secondary: colors.red.lighten4, // #FFCDD2
          success: colors.green.lighten4, // #FFCDD2
        }
      },
    },
  },
})


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
