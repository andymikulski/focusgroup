require('babel/register');

const development = (process.env.PORT || 4000) === 4000;

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config.js')[development ? 'development' : 'production'];

const app = express();
const http = require('http');

app.set('port', process.env.PORT || 4000);

const compiler = webpack(config);


// if(development){
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }));

  app.use(require('webpack-hot-middleware')(compiler));
// }


const server = app.listen(process.env.PORT || 4000, (err) => {
  if (err) {
    console.log(err);
    return;
  }
});


