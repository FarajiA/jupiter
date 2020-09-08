import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { ChoiceTile } from '@helix-design-system/helix-react';
import Error from '../Error';

const InputTiles = (props) => {
  const choiceTiles = _.map(props.options, (item) => {
    return (
      <ChoiceTile
        {...props.input}
        size={props.size}
        key={item.value}
        title={item.label}
        checked={item.value === props.input.value}
        value={item.value}
        className="hxCol hxSpan-4-xs"
      >
        <header className="hxSubdued"><i><small>{item.subheader}</small></i></header>
        <p className="channelType-section-desc">{item.description}</p>
      </ChoiceTile>
    );
  });

  return (
    <div className="hxCol hxSpan-12">
      <label htmlFor={props.id} className={props.required ? 'hxRequired' : null}>
        <span className="InputField-label">{props.label}</span>
      </label>
      <div className="hxRow channelType-fields-spacing">
        {choiceTiles}
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
