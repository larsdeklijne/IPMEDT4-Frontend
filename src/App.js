import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import JourneyInfo from './JourneyInfo';
import TravelerView from './TravelerView';
import EmployeeView from './EmployeeView';
import NewComplaint from './NewComplaint';
import HomePage from './HomePage';
import EmployeeHomePage from './EmployeeHomePage';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import ComplaintView from './ComplaintView';

/* Alle routes worden aangemaakt en voor iedere route word het bijbehorende component ingeladen */

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/journey' component={JourneyInfo} />
            <Route exact path='/traveler' component={TravelerView} />
            <Route path="/:id(\d+)" component={ComplaintView} />
            <Route exact path='/employee' component={EmployeeView} />
            <Route exact path='/employeehomepage' component={EmployeeHomePage} />
            <Route exact path='/create' component={NewComplaint} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
