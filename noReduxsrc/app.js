import React from 'react';
import {render} from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import RouteConfig from './Config/route-config';



let root = document.getElementById('app');

const render2 = Component => {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    root
  );
}

render2(RouteConfig);

if (module.hot) {
  module.hot.accept('./Config/route-config', () => { render2(App) });
};



// render(
//   <RouteConfig/>,
// root);


