import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Post a new lesson the database 
function* addLesson(action) {
  try { 
    console.log('posting new lesson'); 
    yield axios.post('/api/lesson', action.payload);
    yield put({type: 'GET_ALL_LESSONS'}); 
  } catch (error) {
    console.log('Error with new lesson post:', error);
  }
}

// Get all the added lessons for logged in user from the database
function* getAllLessons(){ 
  try {
      console.log('Getting all lessons for logged user from db'); 
      const response = yield axios.get('/api/lesson');
      yield put({type: 'SET_ALL_LESSONS', payload: response.data}); 
      console.log('All lessons from logged in user', response.data); 
  }
  catch (error) {
      console.log('error with test gif get request', error);
  }
}

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
      const response = yield axios.post(`/api/lesson/questions/${action.payload}`);
  }
  catch (error) {
      console.log('error with test gif get request', error);
  }
}

function* getAnswers(action){ 
  try {
      console.log(`Getting all answers for questions ${action.payload} from db`); 
      const response = yield axios.get(`/api/lesson/answers/${action.payload}`);
      yield put({type: 'SET_ANSWER', payload: response.data}); 
      console.log('response from answer get request', response.data)
    }
  catch (error) {
      console.log('error with get request answer request', error);
  }
}

// aggregate all the sagas for the export 
function* lessonSaga() {
  yield takeLatest('ADD_LESSON', addLesson);
  yield takeLatest('GET_ALL_LESSONS', getAllLessons);
  yield takeLatest('GET_QUESTIONS', getQuestions)
  yield takeLatest('GET_ANSWERS', getAnswers)
  yield takeLatest('ADD_QUESTION', addQuestion)
}

export default lessonSaga;

// const config = {
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: true,
// };