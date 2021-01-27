import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  static getDerivedFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Error processing request.</h2>;
    }
    return this.props.children;
  }
}

ErrorBoundary.defaultProps = {
  message: "Something went wrong!",
};

ErrorBoundary.protoTypes = {
  message: PropTypes.string,
};

export default ErrorBoundary;
