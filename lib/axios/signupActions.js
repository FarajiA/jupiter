import axios from 'axios';

export const axiosParameters = {
  headers: {

    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  },
  withCredentials: true
};

export const getSignup = (params, endpoint) => {
  return axios.get(
    `/api/signup/v1/${endpoint}`,
    { ...axiosParameters,
      params: { ...params } }
  );
};

export const getCustomer = (params, endpoint) => {
  return axios.get(
    `/api/customer/v1/${endpoint}`,
    { ...axiosParameters,
      params: { ...params } }
  );
};

export const postSignup = (params, endpoint) => {
  return axios.post(
    `/api/signup/v1/${endpoint}`,
    { ...params },
    { ...axiosParameters }
  );
};
