import { combineReducers } from 'redux'; 

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const currentLesson = (state = [], action) => {
    switch (action.type) {
      case 'SET_CURRENT_LESSON':
        return action.payload;
      default:
        return state;
    }
  };

  export default combineReducers({
    currentLesson,
  });