import AlertComponent from './src/component.vue'

const Options = {
  icons: {
    primary: 'info-circle',
    secondary: 'info-circle',
    warning: 'exclamation-triangle',
    error: 'exclamation-circle',
    success: 'check-circle',
  },
}

const install = Vue => {
  Vue.component('alert-component', AlertComponent)
}

const setup = options => {
  for (let key in options) {
    if (!(key in Options)) return
    Options[key] = options[key]
  }
}

export default {
  install,
}

export { AlertComponent, install as AlertComponentInstaller, setup, Options }
