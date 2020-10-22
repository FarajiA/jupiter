import React from 'react';
import PropTypes from 'prop-types';
import { Button as HelixButton } from '@helix-design-system/helix-react';
import classnames from 'classnames';

class Button extends React.Component {
  render() {
    const {
      label,
      disabled,
      classNames,
      onClick,
      processing,
      submit,
      children,
      variant,
      size,
      wide
    } = this.props;
    const buttonClassNames = classnames(classNames, {
      'submit-btn': submit,
      'btn-wide': wide
    });
    return (
      <HelixButton
        className={buttonClassNames} // helix automatically adds a space between prefilled and added classes
        type={submit ? 'submit' : 'button'}
        disabled={disabled}
        onClick={onClick}
        variant={variant}
        size={size}
        busy={processing}
      >
        {processing ? <span>{label || children}</span> : (label || children)}
      </HelixButton>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  classNames: PropTypes.string,
  processing: PropTypes.bool,
  submit: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
  wide: PropTypes.bool
};

Button.defaultProps = {
  disabled: false,
  classNames: '',
  variant: '',
  submit: false
};


export default Button;
