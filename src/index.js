import './styles/main.scss'

// injects handlebars into the html
const body = require('./partials/body.hbs')
const root = document.querySelector('#root')
root.innerHTML = body()

if (module.hot) {
  module.hot.accept()
}
