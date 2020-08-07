import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { SIZES } from '../constants';

const ChoiceTile = ({
  disabled,
  id,
  icon,
  invalid,
  handleUpdate,
  size,
  subdued,
  name,
  selectedValue,
  item,
  className
}) => {
  return (
    <label htmlFor={id} className={`hxChoice ${className}`}>
      <input
        disabled={disabled}
        invalid={invalid?.toString()}
        name={name}
        value={item.value}
        onChange={(e) => handleUpdate(e)}
        checked={item.value === selectedValue}
        type="radio"
      />
      <hx-tile class={classNames({ hxSubdued: subdued, [SIZES[size]]: true })}>
        <hx-icon type="checkmark" />
        {icon && (
        <div className="hx-tile-icon">
          <hx-icon type={icon} />
        </div>
        )}
        <header>{item.label}</header>
        <header className="hxSubdued"><i><small>{item.subheader}</small></i></header>
        <p className="channelType-section-desc">{item.description}</p>
      </hx-tile>
    </label>
  );
};

ChoiceTile.propTypes = {
  size: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  selectedValue: PropTypes.string,
  item: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    subheader: PropTypes.string,
    description: PropTypes.string
  }),
  handleUpdate: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  invalid: PropTypes.bool,
  subdued: PropTypes.bool
};

export default ChoiceTile;
