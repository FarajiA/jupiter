import { postSignup } from '../../../lib/axios/signupActions';
export const CHECK_ROLES_SUCCESS = 'CHECK_ROLES_SUCCESS';

export const checkRolesSuccess = (authorized) => {
  return {
    type: CHECK_ROLES_SUCCESS,
    authorized
  };
};

export function checkUserRoles(username) {
  const endpoint = 'signups/invoice';
  const req = { dummykey: 'dummyValue' };
  return (dispatch) => {
    return postSignup(req, endpoint)
      .then((response) => {
        dispatch(checkRolesSuccess(true));
      })
      .catch((error) => {
        const statusCode = error.response.status;
        dispatch(checkRolesSuccess(!(statusCode === 403 || statusCode === 401)));
      });
  };
}
