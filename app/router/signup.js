import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UserInfoForm from '../components/SignUp/UserDetails/UserInfoForm';
import CustomerInfoForm from '../components/SignUp/CustomerInfo/CustomerInfoForm';
import BillingInfoForm from '../components/SignUp/BillingInfo/BillingInfoForm';
import { HandleConnectedProgressBar } from '../components/ProgressBar';

const SignupRoutes = () => (
  <div>
    <HandleConnectedProgressBar />
    <br />
    <Switch>
      <Route exact path="/" component={CustomerInfoForm} />
      <Route path="/billing" component={BillingInfoForm} />
      <Route path="/user-detail" component={UserInfoForm} />
    </Switch>
  </div>

);

export default SignupRoutes;
