import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../containers/App';

const Routes = () => (
  <div className="jupiter-wrapper u-flex-grow">
    <Router basename="/racker/jupiter">
      <Route path="/" component={App} />
    </Router>
  </div>
);

export default Routes;
