import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Post a new student the database 
function* addStudent(action) {
  try { 
    yield axios.post('/api/student', action.payload);
    console.log("adding a new student", action.payload)
    // yield put({type: 'GET_ALL_LESSONS'}); 
  } catch (error) {
    console.log('Error with new lesson post:', error);
  }
}

// aggregate all the sagas for the export 
function* lessonSaga() {
  yield takeLatest('ADD_STUDENT', addStudent);
}

export default lessonSaga;