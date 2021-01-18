import { combineReducers } from 'redux'; 

const currentLessonAnswers = (state = [], action) => {
switch (action.type) {
    case 'SET_ANSWER':
      return action.payload;
    default:
      return state;
  }
};


const orderAnswers = (state = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", action) => {
  switch (action.type) {
      case 'ORDER_ANSWER':
        return state;
      default:
        return state;
  }
  };

export default combineReducers({
  currentLessonAnswers, 
  orderAnswers
});