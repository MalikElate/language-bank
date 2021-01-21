import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Post a new lesson the database 
function* addLesson(action) {
  try { 
    yield axios.post('/api/lesson', action.payload);
    yield put({type: 'GET_ALL_LESSONS'}); 
  } catch (error) {
    console.log('Error with new lesson post:', error);
  }
}

// Get all the added lessons for logged in user from the database
function* getAllLessonsForUser(){ 
  try {
      const response = yield axios.get('/api/lesson/user');
      yield put({type: 'SET_ALL_LESSONS', payload: response.data}); 
  }
  catch (error) {
      console.log('error with test gif get request', error);
  }
}
// Get all public lessons for the take lesson home page
function* getAllPublicLessons(){ 
  try {
      const response = yield axios.get('/api/lesson');
      yield put({type: 'SET_ALL_PUBLIC_LESSONS', payload: response.data}); 
  }
  catch (error) {
      console.log('error with test gif get request', error);
  }
}

function* deleteLesson(action){ 
  try {
    yield axios.delete(`/api/lesson/${action.payload.lessonId}`);
  }
  catch (error) {
      console.log('error with test gif get request', error);
  }
}


// aggregate all the sagas for the export 
function* lessonSaga() {
  yield takeLatest('ADD_LESSON', addLesson);
  yield takeLatest('GET_ALL_LESSONS', getAllLessonsForUser);
  yield takeLatest('DELETE_LESSON', deleteLesson);
  yield takeLatest('GET_ALL_PUBLIC_LESSONS', getAllPublicLessons);
}

export default lessonSaga;

// const config = {
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: true,
// };