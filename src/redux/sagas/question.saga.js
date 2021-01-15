import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Get all the added lessons for logged in user from the database
function* getQuestions(action){ 
  try {
      console.log(`Getting all questions for lesson ${action.payload} from db`); 
      const response = yield axios.get(`/api/question/${action.payload}`);
      yield put({type: 'SET_QUESTION', payload: response.data}); 
  }
  catch (error) {
      console.log('error with test gif get request', error);
  }
}

function* addQuestion(action){ 
  try {
      console.log(`Posting a new question for lesson ${action.payload}`); 
      const response = yield axios.post(`/api/question/${action.payload}`);
      console.log(response)
  }
  catch (error) {
      console.log('error with test gif get request', error);
  }
}

function* deleteQuestion(action){ 
  try {
      console.log(`DELETING a new question for lesson ${action.payload}`); 
      const response = yield axios.delete(`/api/question/${action.payload}`);
      console.log(response)
  }
  catch (error) {
      console.log('error with test gif get request', error);
  }
}

// aggregate all the sagas for the export 
function* questionSaga() {
  yield takeLatest('GET_QUESTIONS', getQuestions);
  yield takeLatest('ADD_QUESTION', addQuestion);
  yield takeLatest('DELETE_QUESTION', deleteQuestion);
}

export default questionSaga;

// const config = {
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: true,
// };