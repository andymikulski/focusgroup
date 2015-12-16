import React from 'react';
import InlineCss from 'react-inline-css';

import { connect } from 'react-redux';
import { pushState } from 'redux-router';


/**
 * Header React application entry-point for both the server and client.
 */

@connect((state) => {
  return {
    router: state.router,
    user: state.user
  };
}, { pushState })
export default class Header extends React.Component {

  static propTypes = {};
  static defaultProps = {};
  state = {};

  componentWillMount() {}

  render() {
    return (
      <InlineCss stylesheet={Header.css()} namespace="Header" />
    );
  }
  /**
   * <InlineCss> component allows you to write a CSS stylesheet for your component. Target
   * your component with `&` and its children with `& selectors`. Be specific.
   */
  static css() {
    return (`
      html, body {
        background: #fff;
        color: #111;
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
      }

      .container {
        max-width: 1200px;
        width: 90%;
        margin: 0 auto;
      }
    `);
  }
}
