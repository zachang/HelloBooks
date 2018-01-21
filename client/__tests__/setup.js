// This assures the .babelrc dev config (which includes
// hot module reloading code) doesn't apply for tests.
process.env.NODE_ENV = 'production';
// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.
require.extensions['.css'] = () => null;

require.extensions['.png'] = () => null;

require.extensions['.jpg'] = () => null;

// Register babel so that it will transpile ES6 to ES5
// before our tests run.
require('babel-register')();