/**
 * @type {import('@gopowerteam/request-generate').GenerateOptions}
 */
module.exports = {
  gateway: 'http://127.0.0.1:3000',
  openapi: '/admin/api-docs',
  output: './src/http',
  exportModels: true,
  exportServices: {
    responseType: 'promise',
    excludeQueryParams: ['page', 'size', 'order'],
  },
}
