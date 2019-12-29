const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const Creator = require('./Creator')
const validateProjectName = require('validate-npm-package-name')

/**
 * create app project
 */
async function createVueProject(projectName, options) {

  const cwd = options.cwd || process.cwd()
  const inCurrent = projectName === '.'
  const name = inCurrent ? path.resolve(cwd, projectName || '.') : projectName
  const targetDir = path.resolve(cwd, projectName || '.')

  const result = validateProjectName(name)
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`))
    result.errors && result.errors.forEach(err => {
      console.log(chalk.red.dim('Error:' + err))
    })
    result.warnings && result.warnings.forEach((warn) => {
      console.error(chalk.red.dim('Warning: ' + warn))
    })
    process.exit(1)
  }

  if (fs.existsSync(targetDir)) {
    console.log(chalk.red('A folder with the same name already exists in the current path'))
    process.exit(1)
  }

  const creator = new Creator(name, targetDir)
  await creator.create(options)

}

module.exports = createVueProject
