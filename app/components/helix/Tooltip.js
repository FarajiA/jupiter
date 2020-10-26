import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as HelixTooltip } from '@helix-design-system/helix-react';

const Tooltip = (props) => {
  const { id, type, position, children } = props;
  return (
    <div className="tooltip">
      <hx-icon id={id} type={type} />
      <HelixTooltip
        id={id}
        position={position}
      >
        {children}
      </HelixTooltip>
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  position: PropTypes.string,
  type: PropTypes.string
};

Tooltip.defaultProps = {
  position: 'right-middle',
  type: 'help-circle'
};
export default Tooltip;
