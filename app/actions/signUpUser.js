import _ from 'lodash';
import { reset } from 'redux-form';
import { postSignup } from '../../lib/axios/signupActions';

export const SUBMIT_PENDING = 'SUBMIT_PENDING';
export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';
export const SUBMIT_FAILURE = 'SUBMIT_FAILURE';
export const CLEAR_RESULT = 'CLEAR_RESULT';

export const submitPending = (values, username, accountname) => {
  return {
    type: SUBMIT_PENDING,
    username,
    accountname
  };
};

export const submitSuccess = (ddi) => {
  return {
    type: SUBMIT_SUCCESS,
    ddi
  };
};

export const submitFailure = (errorResponse) => {
  return {
    type: SUBMIT_FAILURE,
    error: {
      code: errorResponse.status,
      message: errorResponse.data.message
    }
  };
};

export function clearResult() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_RESULT
    });
  };
}


export function submitUserData(values) {
  const username = _.get(values, ['contacts', 'contact', 0, 'user', 'username']);
  const accountName = _.get(values, ['accountName']);
  return (dispatch) => {
    dispatch(submitPending(values, username, accountName));
    const endpoint = 'signups/invoice';
    postSignup(values, endpoint)
      .then((response) => {
        dispatch(submitSuccess(response.data.id));
        dispatch(reset('signUp'));
      })
      .catch((error) => {
        dispatch(submitFailure(error.response));
        throw (error);
      });
  };
}
