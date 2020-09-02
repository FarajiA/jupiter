import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signUp from './signUpReducer';
import checkUsername from './checkUsernameReducer';
import getCountry from './getCountryReducer';
import listCountries from './listCountriesReducer';
import addressValidation from './validateAddressReducer';
import validateRoles from './validateRolesReducer';

export default combineReducers({
  form: formReducer,
  signUpResponse: signUp,
  username: checkUsername,
  countries: listCountries,
  country: getCountry,
  roles: validateRoles,
  addressValidation
});
