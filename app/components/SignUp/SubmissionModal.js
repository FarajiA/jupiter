import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Div } from '@helix-design-system/helix-react';
import Button from '../helix/buttons/Button';
import { withTranslation } from 'react-i18next';

export class SubmissionModal extends React.Component {
  responseMessage = () => {
    const { success, errorMessage, errorCode, t, username, accountname, ddi } = this.props;

    const modalContent = {
      header: '',
      message: ''
    };
    if (success) {
      modalContent.header = t('common:create.status.success');
      modalContent.message = t('account:user.status.create.success', {
        username,
        accountname,
        ddi
      });
    } else {
      modalContent.header = t('validation:error.header');
      switch (errorCode) {
        case 400:
          if (errorMessage === 'Invalid Password') {
            modalContent.message = t('validation:error.create.password');
          } else if (errorMessage === 'User name already in use.') {
            modalContent.message = t('validation:error.create.userExists', { username });
          } else {
            modalContent.message = errorMessage;
          }
          break;
        case 401:
          modalContent.message = t('validation:error.notAuthorized');
          break;
        case 500:
          modalContent.message = t('validation:error.serverError');
          break;
        default:
          modalContent.message = t('validation:error.create.processing', { errorMsg: errorMessage });
      }
    }
    return modalContent;
  };

  returnModal = () => {
    const { t, hideModal, open } = this.props;
    const message = this.responseMessage();
    return (
      <Modal open={open} onClose={hideModal}>
        <header>
          <h1>{message.header}</h1>
        </header>
        <Div>
          <p>{message.message}</p>
        </Div>
        <footer>
          <Button
            type="button"
            classNames="hxPrimary"
            onClick={hideModal}
            label={t('common.status.ok')}
          />
        </footer>
      </Modal>
    );
  };

  render() {
    return (
      <div className="submission-modal">
        {this.returnModal()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    success: state.signUpResponse.success,
    errorMessage: state.signUpResponse.error && state.signUpResponse.error.message,
    errorCode: state.signUpResponse.error && state.signUpResponse.error.code,
    accountname: state.signUpResponse.accountname,
    username: state.signUpResponse.username,
    ddi: state.signUpResponse.ddi
  };
};

SubmissionModal.propTypes = {
  success: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  username: PropTypes.string,
  accountname: PropTypes.string,
  ddi: PropTypes.string,
  errorMessage: PropTypes.string,
  errorCode: PropTypes.number,
  hideModal: PropTypes.func,
  t: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(withTranslation()(SubmissionModal));
