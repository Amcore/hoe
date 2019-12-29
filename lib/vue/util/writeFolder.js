/**
 * !! write folder
 */
const fs = require('fs-extra')

 /**
 * @param dir path
 * @param folder
 */
module.exports = function (targetPath, sourcePath) {
  return new Promise((resolve, reject) => {
    fs
      .copy(sourcePath, targetPath)
      .then(() => {
        resolve(true)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


