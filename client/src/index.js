import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'jquery-slimscroll';
import $ from 'jquery';
import store from './store/store';
import routes from './routes';
import './build/materialize/js/init';
import './build/materialize/css/materialize.min.css';
import './build/assets/css/helloadmin.scss';
import './build/assets/css/hellobooks.scss';
import './build/assets/css/user.scss';

window.jQuery = $;

ReactDOM.render(<Provider store={store}>{routes}</Provider>,
  document.getElementById('root'));
