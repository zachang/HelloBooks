import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import routes from './routes';
import './build/assets/css/helloadmin.scss';
import './build/assets/css/hellobooks.scss';
import './build/assets/css/user.scss';

ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById('root'));
