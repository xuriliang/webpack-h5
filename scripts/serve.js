//webpack-dev-server --inline --progress --config config/webpack.config.js

const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')
const args = require('minimist')(process.argv.slice(2))
const targets = args._

execa("webpack", ["serve","--env", `target=${targets[0]}`, "--inline", "--progress", "--config", "config/webpack.config.js"]).then(result => {
  console.log(result.stdout);
}).catch(err => console.log(err));