import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import $ from 'jquery';

global.$ = $;
$.prototype.sideNav = () => { };
$.prototype.material_select = () => { };
$.prototype.pickadate = () => { };
$.prototype.modal = () => { };
$.prototype.collapsible = () => { };
$.prototype.dropdown = () => { };
$.prototype.tooltip = () => { };


global.Materialize = {
  toast: () => { }
};

global.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\
eyJpZCI6MSwiZnVsbG5hbWUiOiJEYXd1ZGEgRWJlbmV6ZXIiLCJ1\
c2VybmFtZSI6ImViZW5lemEiLCJlbWFpbCI6ImViZW5lemFAZ21ha\
WwuY29tIiwicGhvbmVObyI6IjA3MDU3NzQ2OTg1IiwidXNlckltYWd\
lIjoiaHR0cDovL3Jlcy5jbG91ZGluYXJ5LmNvbS9oZWxsb2Jvb2t6L2\
ltYWdlL3VwbG9hZC92MTUxNjYxODExMy9iZHllcWlrbnhidHFiZ21ic\
mkxMy5qcGciLCJpc0FkbWluIjp0cnVlLCJpc1NvY2lhbCI6ZmFsc2Us\
InJlZ1R5cGUiOiJyZWd1bGFyIiwibGV2ZWwiOiJwbGF0aW51bSIsImN\
yZWF0ZWRBdCI6IjIwMTgtMDEtMTBUMDc6NDM6NTMuMDEzWiIsInVwZG\
F0ZWRBdCI6IjIwMTgtMDEtMjJUMTA6NDg6MzMuNzQ4WiIsImlhdCI6M\
TUxNjcwNzg0MiwiZXhwIjoxNTE2NzQzODQyfQ.3l1BxZCG1wS3d7Mdt\
1XoC6nEwbfRPzgqBdl-T0SncTs\
';

global.sessionStorage = {
  clear: jest.fn(),
  setItem: jest.fn(data => data),
  getItem: jest.fn(() => {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\
eyJpZCI6MSwiZnVsbG5hbWUiOiJEYXd1ZGEgRWJlbmV6ZXIiLCJ1\
c2VybmFtZSI6ImViZW5lemEiLCJlbWFpbCI6ImViZW5lemFAZ21ha\
WwuY29tIiwicGhvbmVObyI6IjA3MDU3NzQ2OTg1IiwidXNlckltYWd\
lIjoiaHR0cDovL3Jlcy5jbG91ZGluYXJ5LmNvbS9oZWxsb2Jvb2t6L2\
ltYWdlL3VwbG9hZC92MTUxNjYxODExMy9iZHllcWlrbnhidHFiZ21ic\
mkxMy5qcGciLCJpc0FkbWluIjp0cnVlLCJpc1NvY2lhbCI6ZmFsc2Us\
InJlZ1R5cGUiOiJyZWd1bGFyIiwibGV2ZWwiOiJwbGF0aW51bSIsImN\
yZWF0ZWRBdCI6IjIwMTgtMDEtMTBUMDc6NDM6NTMuMDEzWiIsInVwZG\
F0ZWRBdCI6IjIwMTgtMDEtMjJUMTA6NDg6MzMuNzQ4WiIsImlhdCI6M\
TUxNjcwNzg0MiwiZXhwIjoxNTE2NzQzODQyfQ.3l1BxZCG1wS3d7Mdt\
1XoC6nEwbfRPzgqBdl-T0SncTs\
';
  }),
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
