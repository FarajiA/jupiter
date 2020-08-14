import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppProvider from '../containers/AppContainer';

const Routes = () => (
  <div className="jupiter-wrapper u-flex-grow">
    <Router basename="/racker/jupiter">
      <Route path="/" component={AppProvider} />
    </Router>
  </div>
);

export default Routes;
