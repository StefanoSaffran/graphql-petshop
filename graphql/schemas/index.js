const path = require('path');
const mergeSchemas = require('merge-graphql-schemas');

const files = path.join(__dirname, './');

const { fileLoader, mergeTypes } = mergeSchemas;

const loadedFiles = fileLoader(files);

const schemas = mergeTypes(loadedFiles);

module.exports = schemas;