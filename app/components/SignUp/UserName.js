import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, Field, formValueSelector, getFormMeta } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { checkUsername } from '../../actions/checkUsername';
import Input from '../helix/inputTypes/Input';

class UserName extends React.Component {
  returnUsername = () => {
    const { firstName, lastName, formMeta, setUsername, username, checkIfExists } = this.props;
    const concatUsername = firstName && lastName ? (`${firstName}.${lastName}`).toLowerCase() : '';
    if (concatUsername) {
      if (!formMeta.userInfo.firstName.active && !formMeta.userInfo.lastName.active) {
        checkIfExists(concatUsername);
        setUsername(username);
      }
    }
  };

  render() {
    const { t } = this.props;
    this.returnUsername();
    return (
      <div className="hxCol hxSpan-12">
        <Field
          name="username"
          component={Input}
          type="text"
          label={t('common:actions.create.username')}
          required
        />
      </div>
    );
  }
}

UserName.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  setUsername: PropTypes.func.isRequired,
  checkIfExists: PropTypes.func.isRequired,
  formMeta: PropTypes.shape({
    userInfo: PropTypes.shape({
      firstName: PropTypes.object,
      lastName: PropTypes.object
    })
  }),
  username: PropTypes.string,
  t: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    firstName: formValueSelector('signUp')(state, 'userInfo.firstName'),
    lastName: formValueSelector('signUp')(state, 'userInfo.lastName'),
    formMeta: getFormMeta('signUp')(state),
    username: state.username.username
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (username) => {
      dispatch(change('signUp', 'userInfo.username', username));
    },
    checkIfExists: (username) => {
      dispatch(checkUsername(username));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UserName));
