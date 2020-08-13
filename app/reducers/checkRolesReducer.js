import {
  CHECK_ROLES_SUCCESS
} from '../actions/authInfo/checkRoles';

export const INITIAL_STATE = {
  pending: true,
  authorized: false,
  success: false
};

export default function checkRolesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHECK_ROLES_SUCCESS:
      return {
        ...state,
        success: true,
        pending: false,
        authorized: action.authorized
      };
    default:
      return state;
  }
}
