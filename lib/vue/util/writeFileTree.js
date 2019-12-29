/**
 * !! write file
 */

const fs = require('fs-extra')
const path = require('path')

/**
 * @param dir path
 * @param files file list
 */
module.exports = async function writeFileTree(dir, files) {
  Object
    .keys(files)
    .forEach((name) => {
      const filePath = path.join(dir, name)
      fs.ensureDirSync(path.dirname(filePath))
      fs.writeFileSync(filePath, files[name])
    })
}
