import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Get all the added lessons for logged in user from the database
function* getQuestions(action){ 
  try {
      const response = yield axios.get(`/api/question/${action.payload}`);
      yield put({type: 'SET_QUESTION', payload: response.data}); 
  }
  catch (error) {
      console.log('error with question GET request', error);
  }
}

function* addQuestion(action){ 
  try {
      const response = yield axios.post(`/api/question/${action.payload.lessonId}`, action.payload);
      yield put({type: 'GET_QUESTIONS', payload: action.payload.lessonId});
  }
  catch (error) {
      console.log('error with question POST request', error);
  }
}

function* deleteQuestion(action){ 
  try {
      const response = yield axios.delete(`/api/question/${action.payload.questionId}`);
      yield put({type: 'GET_QUESTIONS', payload: action.payload.lessonId});
  }
  catch (error) {
      console.log('error with question DELETE request', error);
  }
}

function* editQuestion(action){ 
  try {
      const response = yield axios.put(`/api/question/${action.payload.questionId}`, action.payload);
      yield put({type: 'GET_QUESTIONS', payload: action.payload.lessonId});
  }
  catch (error) {
      console.log('error with question PUT request', error);
  }
}

// aggregate all the sagas for the export 
function* questionSaga() {
  yield takeLatest('GET_QUESTIONS', getQuestions);
  yield takeLatest('ADD_QUESTION', addQuestion);
  yield takeLatest('DELETE_QUESTION', deleteQuestion);
  yield takeLatest('EDIT_QUESTION', editQuestion);
}

export default questionSaga;

// const config = {
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: true,
// };