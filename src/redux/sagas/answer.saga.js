import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// POST a answer to the db
function* addAnswer(action) {
    try { 
      yield axios.post('/api/answer', {questionId: action.payload});
    //   yield put({type: 'GET_ALL_LESSONS'}); 
    } catch (error) {
      console.log('Error with new lesson post:', error);
    }
  }
// DELETE an answer from db 
function* deleteAnswer(action) {
  try { 
    console.log('--------DELETING answer----------------', action.payload); 
    yield axios.delete(`/api/answer/${action.payload}`);
    yield put({type: 'GET_ALL_LESSONS'}); 
  } catch (error) {
    console.log('Error with new lesson post:', error);
  }
}

// aggregate all the sagas for the export 
function* answerSaga() {
    yield takeLatest('ADD_ANSWER', addAnswer)
    yield takeLatest('DELETE_ANSWER', deleteAnswer)
}

export default answerSaga;

// const config = {
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: true,
// };