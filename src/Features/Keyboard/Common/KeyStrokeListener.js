import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { keyDown, keyUp } from '../KeyboardSlice';

class KeyStrokeListener extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.documentKeyDown = this.documentKeyDown.bind(this);
    this.documentKeyUp = this.documentKeyUp.bind(this);

    this.dispatch = useDispatch();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.documentKeyDown);
    document.addEventListener('keyup', this.documentKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.documentKeyDown);
    document.removeEventListener('keyup', this.documentKeyUp);
  }

  documentKeyDown(e) {
    this.dispatch(keyDown(e.code));
  }

  documentKeyUp(e) {
    this.dispatch(keyUp(e.code));
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

KeyStrokeListener.propTypes = {
  children: PropTypes.node.isRequired,
};

export default KeyStrokeListener;
