'use strict'
module.exports = {
  NODE_ENV: '"production"',
  WEBPACK_CONIFG_HOST: 'location.origin + location.pathname.substring(0, location.pathname.indexOf("/", 1)) + "/"'
}
