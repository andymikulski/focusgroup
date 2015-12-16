import React from 'react';
import InlineCss from 'react-inline-css';
import Analytics from 'components/Analytics';

export default class Footer extends React.Component {

  static defaultProps = {};
  static propTypes = {};
  state = {};

  render() {
    return (
      <InlineCss stylesheet={ Footer.css() } namespace="Footer">
        <div className="container">
        </div>

        <Analytics />
      </InlineCss>
    );
  }

  static css() {
    return (`
      & {
       display: block;
       width: 100%;
      }
    `);
  }
}
