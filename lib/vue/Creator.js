const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const EventEmitter = require('events')
const writeFileTree = require('./util/writeFileTree')
const wirteFolder = require('./util/writeFolder')
const pkgTemp = require('./template/pkg/package')
const webpackConfig = require('./template/webpack/webpack.config')

module.exports = class Creator extends EventEmitter {
  constructor(name, context) {
    super()

    this.name = name
    this.context = process.env.VUE_CONTEXT = context
  }
  async create(cliOptions = {}, preset = null) {

    const {
      name,
      context
    } = this

    // package.json
    const pkg = Object.assign({
      name,
      version: '1.0.0',
    }, pkgTemp)
    await writeFileTree(context, {
      'package.json': JSON.stringify(pkg, null, 2)
    })

    // vue project
    // write vue project (copy template)
    const projectSourcePath = path.join(__dirname, 'template/project-template')
    await wirteFolder(context, projectSourcePath)

    // webpackConfig
    await writeFileTree(context, {
      'webpack.config.js': webpackConfig()
    })

    // env
    const envSourcePath = path.join(__dirname, 'template/env-template')
    await wirteFolder(context, envSourcePath)

    console.log(chalk.green(`... Successfully created Vue project ${chalk.yellow(name)}`))

  }
}
