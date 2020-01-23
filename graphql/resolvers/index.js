const path = require('path');
const mergeSchemas = require('merge-graphql-schemas');

const files = path.join(__dirname, './');

const { fileLoader } = mergeSchemas;

const loadedFiles = fileLoader(files);

module.exports = loadedFiles;