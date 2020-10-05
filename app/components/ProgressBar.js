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
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="30"
              src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/9d/Pichu.png/revision/latest?cb=20170407222851"
              alt=""
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="30"
              src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/97/Pikachu_%28Smiling%29.png/revision/latest?cb=20170410234508"
              alt=""
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="30"
              src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/97/Pikachu_%28Smiling%29.png/revision/latest?cb=20170410234508"
              alt=""
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="30"
              src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
              alt=""
            />
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
