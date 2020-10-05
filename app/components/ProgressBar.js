import React from 'react';
import PropTypes from 'prop-types';
import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';
import { connect } from 'react-redux';

export class HandleProgressBar extends React.Component {
  render() {
    const val = (100 * this.props.completed_steps) / 3;
    return (
      <ProgressBar
        percent={val}
        filledBackground="linear-gradient(to right, #70b0b5, #0C7C84)"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <hx-icon class="progressbar" type="checkmark-circle" />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <hx-icon class="progressbar" type="checkmark-circle" />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <hx-icon class="progressbar" type="checkmark-circle" />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <hx-icon class="progressbar" type="checkmark-circle" />
          )}
        </Step>
      </ProgressBar>
    );
  }
}

HandleProgressBar.propTypes = {
  completed_steps: PropTypes.number.isRequired
};

// redux container component
const mapStateToProps = (state, ownProps) => {
  return ({
    completed_steps: state.steps.completed_steps
  });
};

export const HandleConnectedProgressBar = connect(
  mapStateToProps,
  null
)(HandleProgressBar);
