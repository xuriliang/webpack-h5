const fs = require('fs-extra')
const path = require('path')
const execa = require('execa')
const args = require('minimist')(process.argv.slice(2))
const targets = args._



async function buildAll(targets) {
  for (const target of targets) {
    await build(target)
  }
}

async function build(target) {
  const pageDir = path.resolve(`pages/${target}`)

  await fs.remove(path.resolve(__dirname, '../', 'dist', target))

  execa("webpack-cli", ["--env","prod","--env", `target=${target}`, "--config", "config/webpack.config.js"]).then(result => {
    console.log(result.stdout);
  }).catch(err => console.log(err));

}


buildAll(targets)