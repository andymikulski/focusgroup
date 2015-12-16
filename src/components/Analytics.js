import React from 'react';

export default class Analytics extends React.Component {

  static propTypes = {};
  static defaultProps = {
    'gaID': 'UA-71404404-1'
  };
  state = {};

  render() {
    return (
      <script dangerouslySetInnerHTML={{ __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', '${ this.props.gaID }', 'auto');
        ga('send', 'pageview');` }}>
      </script>
    );
  }
}
