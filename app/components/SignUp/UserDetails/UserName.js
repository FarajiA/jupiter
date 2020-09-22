import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, Field, getFormSyncErrors } from 'redux-form';
import { withTranslation } from 'react-i18next';
import Input from '../../helix/inputTypes/Input';
import Tooltip from '../../helix/Tooltip';

export class UserName extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.username && prevProps.username !== this.props.username) {
      this.props.setUsername(this.props.username);
    }
  }

  returnSuffix = (usernameErrors) => {
    if (this.props.loading) {
      return <hx-busy> </hx-busy>;
      // username initial state is always null
      // usernameErrors initial state will always include the 'Required' error
      // this avoids showing the exclamation before the field has been touched, but shows when a sync error occurs
    } if (this.props.success && !usernameErrors && !this.props.exists) {
      return <hx-icon class="checkmark" type="checkmark-circle"> </hx-icon>;
    } if (!this.props.formSubmitted && (this.props.exists || usernameErrors)) {
      return <hx-icon class="exclamation" type="exclamation-circle"> </hx-icon>;
    }
  };

  render() {
    const { t, syncErrors: { userInfo }, username, exists } = this.props;
    const tooltip = (
      <Tooltip id="username">{t('account:user.tips.username.generate')}</Tooltip>
    );
    const suffix = username && this.returnSuffix(userInfo.username);
    return (
      <div className="hxCol hxSpan-12 UsernameField">
        <Field
          name="username"
          component={Input}
          tooltip={tooltip}
          type="text"
          label={t('account:user.actions.username.create')}
          hxClassNames={exists ? 'hxInvalid' : ''}
          required
        >
          {suffix && <span className="hxSuffix">{suffix}</span>}
        </Field>
      </div>
    );
  }
}

UserName.propTypes = {
  setUsername: PropTypes.func.isRequired,
  username: PropTypes.string,
  t: PropTypes.func.isRequired,
  success: PropTypes.bool,
  formSubmitted: PropTypes.bool,
  exists: PropTypes.bool,
  loading: PropTypes.bool,
  syncErrors: PropTypes.shape({
    userInfo: PropTypes.shape({
      username: PropTypes.array
    })
  })
};

const mapStateToProps = (state) => {
  return {
    username: state.username.username,
    loading: state.username.pending,
    success: state.username.success,
    exists: state.username.exists,
    formSubmitted: state.signUpResponse.success,
    syncErrors: getFormSyncErrors('signUp')(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (username) => {
      dispatch(change('signUp', 'userInfo.username', username));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(UserName));
