import React from 'react';
import PropTypes from 'prop-types';

class WindowEventListener extends React.Component {
  constructor(props) {
    super(props);

    if (props.onBlur) {
      // This binding is necessary to make `this` work in the callback
      this.windowBlur = this.windowBlur.bind(this);
      this.onBlurCallback = props.onBlur;
    }

    if (props.onFocus) {
      // This binding is necessary to make `this` work in the callback
      this.windowFocus = this.windowFocus.bind(this);
      this.onFocusCallback = props.onFocus;
    }
  }

  componentDidMount() {
    if (this.onBlurCallback) {
      window.addEventListener('blur', this.windowBlur);
    }
    if (this.onFocusCallback) {
      window.addEventListener('focus', this.windowFocus);
    }
  }

  componentWillUnmount() {
    if (this.onBlurCallback) {
      window.removeEventListener('blur', this.windowBlur);
    }
    if (this.onFocusCallback) {
      window.removeEventListener('focus', this.windowFocus);
    }
  }

  windowFocus() {
    this.onFocusCallback();
  }

  windowBlur() {
    this.onBlurCallback();
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

WindowEventListener.defaultProps = {
  onBlur: null,
  onFocus: null,
};

WindowEventListener.propTypes = {
  children: PropTypes.node.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

export default WindowEventListener;
