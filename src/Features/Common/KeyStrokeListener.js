import React from 'react';
import PropTypes from 'prop-types';

class KeyStrokeListener extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.documentKeyDown = this.documentKeyDown.bind(this);
    this.documentKeyUp = this.documentKeyUp.bind(this);
    this.fireOnKeyDown = props.onKeyDown;
    this.fireOnKeyUp = props.onKeyUp;
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
    if (e.repeat) { return; }
    this.fireOnKeyDown(e.code);
  }

  documentKeyUp(e) {
    if (e.repeat) { return; }
    this.fireOnKeyUp(e.code);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

KeyStrokeListener.propTypes = {
  children: PropTypes.node.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

export default KeyStrokeListener;
