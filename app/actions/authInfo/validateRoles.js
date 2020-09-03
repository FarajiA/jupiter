import axios from 'axios';
import _ from 'lodash';
import { axiosParameters } from '../../../lib/axios/signupActions';
export const CHECK_ROLES_SUCCESS = 'CHECK_ROLES_SUCCESS';

export const validateRolesSuccess = (authorized) => {
  return {
    type: CHECK_ROLES_SUCCESS,
    authorized
  };
};

export function validateUserRoles(username) {
  const endpoint = '/api/identity-internal/v2.0/tokens/';
  let reqRole;
  if (window.location.host === 'localhost:3000') {
    // eslint-disable-next-line no-undef
    reqRole = (ENV_URL === 'https://portal.rackspace.com/')
      ? 'signup_service_create_invoice_signup_prod'
      : 'signup_service_create_invoice_signup_staging';
  } else {
    reqRole = (window.location.host === 'portal.rackspace.com')
      ? 'signup_service_create_invoice_signup_prod'
      : 'signup_service_create_invoice_signup_staging';
  }
  console.log(reqRole);
  return (dispatch) => {
    return axios.get(endpoint, { axiosParameters })
      .then((response) => {
        const { roles } = response.data.access.user;
        const signupRole = _.find(roles, (obj) => obj.name === reqRole);
        signupRole
          ? dispatch(validateRolesSuccess(true))
          : dispatch(validateRolesSuccess(false));
      })
      .catch((error) => {
        dispatch(validateRolesSuccess(false));
      });
  };
}
