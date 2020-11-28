import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../containers/Home';
import Register from '../containers/Register';
import Drop from '../containers/Drop';
import Layout from '../components/Layout';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/agregar' component={Register} />
        <Route exact path='/eliminar' component={Drop} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
