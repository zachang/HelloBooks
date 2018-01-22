import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import $ from 'jquery';

global.$ = $;
$.prototype.sideNav = () => { };
$.prototype.material_select = () => { };
$.prototype.modal = () => { };

global.Materialize = {
  toast: () => { }
};

global.sessionStorage = {
  clear: jest.fn(),
  set: jest.fn(data => data),
  get: jest.fn(),
  removeItem: jest.fn(item => item)
};

global.CLOUDINARY_IMG_URL_STUB = 'cloudinary-stub';

configure({ adapter: new Adapter() });

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