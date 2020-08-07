import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import Error from '../Error';
import ChoiceTile from './ChoiceTile';

const InputTiles = (props) => {
  const options = _.map(props.options, (item, index) => {
    return (
      <ChoiceTile
        className="hxCol hxSpan-4-xs"
        {...props.input}
        size={props.size}
        key={item.value}
        item={item}
        handleUpdate={props.handleChannelUpdate}
        selectedValue={props.selectedValue}
      />
    );
  });
  return (
    <div className="hxCol hxSpan-12">
      <label htmlFor={props.id} className={props.required ? 'hxRequired' : null}>
        <span className="InputField-label">{props.label}</span>
      </label>
      <div className="hxRow channelType-fields-spacing">
        {options}
      </div>
      <Error meta={props.meta} />

      <div className="hxRow" id="tiles-desc">
        <span className="hxCol hxSpan-12">{props.disclaimer}</span>
      </div>
    </div>
  );
};

InputTiles.propTypes = {
  children: PropTypes.node,
  size: PropTypes.string,
  id: PropTypes.string,
  handleChannelUpdate: PropTypes.func,
  selectedValue: PropTypes.string,
  disclaimer: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  disabled: PropTypes.bool,
  input: PropTypes.shape({
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }),
  meta: PropTypes.shape({
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ])
  }),
  required: PropTypes.bool
};

export default InputTiles;
