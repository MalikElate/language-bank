import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { ThemeProvider } from '@material-ui/core'; 
import theme from './theme'; 

import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';
import AboutPage from '../AboutPage/AboutPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import UserPage from '../UserPage/UserPage';
import Dashboard from '../Dashboard/Dashboard';
import CreateLessonPage from '../CreateLessonPage/CreateLessonPage';
import LessonDetails from '../LessonDetails/LessonDetails'; 
import AddQuestion from '../AddQuestionsPage/AddQuestionPage'; 
import TakeLessonHome from '../TakeLessonHome/TakeLessonHome'
import TakeLessonForm from '../TakeLessonForm/TakeLessonForm'; 
import TakeLessonFormQuestion from '../TakeLessonQuestion/TakeLessonQuestion'; 
import TakeLessonConfirmation from '../TakeLessonConirmation/TakeLessonConfirmation';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      
      <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Nav /> 
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            <Redirect exact from="/user" to="/dashboard" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
              component={AboutPage}
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
              component={UserPage}
              // authRedirect="/dashboard"
            />
            <Route
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              component={LandingPage}
              // authRedirect="/user"
            />
            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/dashboard"
              component={Dashboard}
            /> 

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/lesson/details/:lessonId"
              component={LessonDetails}
            /> 

            <ProtectedRoute
              exact
              path="/create-lesson"
              component={CreateLessonPage}
            />
            
          
            <ProtectedRoute
              exact
              path='/add-questions/:id'
              component={AddQuestion}
            />           

            <Route
            exact 
            path="/take-lesson"
            component={TakeLessonHome}
            />

            <Route
            exact 
            path="/take-lesson/form/:lessonId"
            component={TakeLessonForm}
            />

            <Route
            exact 
            path="/take-lesson/question/:lessonId/:questionId"
            component={TakeLessonFormQuestion}
            />    

            <Route
            exact 
            path="/take-lesson/confirmation/:lessonId"
            component={TakeLessonConfirmation}
            /> 
            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/user"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/user"
            />
            
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
     </ThemeProvider>
    );
  }
}
const mapStateToProps = reduxState => ({
  reduxState
});

export default connect(mapStateToProps)(App);
