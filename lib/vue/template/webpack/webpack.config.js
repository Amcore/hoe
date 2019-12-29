/**
 * webpack template
 */

const createWebpackConfig = () => {
  const template = 
`module.exports = {
  devServer: {
    port: 8080,
    host: 'localhost',
    proxy: {
    }
  }
}`
  
  return template
}

module.exports = createWebpackConfig
