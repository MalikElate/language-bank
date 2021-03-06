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

const allPublicLessons = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_PUBLIC_LESSONS':
      return action.payload;
    default:
      return state;
  }
};

const currentLesson = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_LESSONS':
      return action.payload;
    default:
      return state;
  }
};

const allPublicPrivateLessons = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALL_PUBLIC_PRIVATE_LESSONS':
      return action.payload;
    default:
      return state;
  }
};


// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  allUserLessons,
  allPublicLessons, 
  allPublicPrivateLessons, 
  currentLesson
});
