import React from 'react';
import {render} from 'react-dom';
import App from './pages/';
import {Provider} from 'react-redux';
import store from './configureStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import css from './styles/home.styl';
// we are injecting this plugin so that material-ui can use
injectTapEventPlugin();
//rendering our App between redux Provider for state access and MuiThemeProvider for material-ui
render(
  <Provider store = {store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <App/>
    </MuiThemeProvider>
  </Provider>
  ,document.getElementById('root'));
