import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Post a new lesson the database 
function* addLesson(action) {
  try { 
    console.log('posting new lesson'); 
    yield axios.post('/api/lesson', action.payload);
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

// aggregate all the sagas for the export 
function* lessonSaga() {
  yield takeLatest('ADD_LESSON', addLesson);
  yield takeLatest('GET_ALL_LESSONS', getAllLessons);
  // yield takeLatest('LOGOUT', logoutUser); 
}

export default lessonSaga;

// const config = {
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: true,
// };