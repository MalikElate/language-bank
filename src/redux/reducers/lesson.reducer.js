import { combineReducers } from 'redux';

// This reducer holds all of a users lessons, to be displayed on the dashboard page
const allUserLessons = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_LESSONS':
      return action.payload;
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const currentLesson = (state = [], action) => {
  switch (action.type) {
    case 'CLEAR_REGISTRATION_ERROR':
      return '';
    case 'REGISTRATION_INPUT_ERROR':
      return 'Choose a username and password!';
    case 'REGISTRATION_FAILED':
      return "Oops! That didn't work. The username might already be taken. Try again!";
    default:
      return state;
  }
}; 

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  allUserLessons,
  currentLesson,
});
