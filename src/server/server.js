/* eslint-disable global-require */
import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderToString } from 'react-dom/server';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import mongoose from 'mongoose';
import serverRoutes from '../frontend/routes/serverRoutes';
import reducer from '../frontend/reducers';
// import initialState from '../frontend/initialState';
import Item from './models/Item';
import 'regenerator-runtime/runtime';

const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const { ENV, PORT, MONGODB } = process.env;

const app = express();
const port = 3000;

mongoose
  .connect(
    `${MONGODB}zoo`,
    { useNewUrlParser: true },
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

if (ENV === 'development') {
  console.log('Development config');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = { port: PORT, hot: true };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(`${__dirname}/public`));
  app.disable('x-powered-by');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const setResponse = (html, preloadedState, pathAsset) => {
  return (`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Zoo application</title>
      <link rel="stylesheet" href="${pathAsset}assets/app.css" type="text/css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </head>
    <body>
      <div id="app">${html}</div>
      <script type='text/javascript'>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script src="${pathAsset}assets/app.js?v=15" type="text/javascript"></script>
    </body>
  </html>
  `);
};

const renderApp = (req, res) => {

  const store = createStore(reducer, {
    user: '',
    token: '',
  });
  const preloadedState = store.getState();

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes)}
      </StaticRouter>
    </Provider>,
  );

  const requestSplit = req.url.split('/');
  let pathAsset = '';
  if (requestSplit.length < 4) pathAsset = '../';
  else if (requestSplit.length >= 4) {
    const longitud = requestSplit.length - 2;
    let i = 1;
    while (i <= longitud) {
      pathAsset += '../';
      i++;
    };
  };

  res.send(setResponse(html, preloadedState, pathAsset));

};

app.get('/api/items', async (req, res) => {
  const filter = {};
  try {
    const data = await Item.find(filter);

    res.json({ statusCode: 200, data });
  } catch (e) {
    res.json({ statusCode: 500, data: null });
  }
});

app.get('/api/item/:id', async (req, res) => {

  const { id } = req.params;

  const filter = { id };
  try {
    const data = await Item.find(filter);

    res.json({ data });
  } catch (e) {
    res.json({ data: null });
  }
});

app.post('/api/item/delete', async (req, res) => {

  const { name } = req.body.data;

  const filter = { name };

  try {
    const data = await Item.deleteOne(filter);

    res.json({ data });
  } catch (e) {
    res.json({ data: null });
  }
});

app.post('/api/item/add', async (req, res) => {
  const { name } = req.body.data;

  const item = new Item({ 'id': uuidv4(), 'name': name });

  try {
    const data = await item.save();

    res.json({ data });
  } catch (e) {
    res.json({ data: null });
  }

});

app.get('*', renderApp);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
