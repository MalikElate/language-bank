import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// POST a answer to the db
function* addAnswer(action) {
    try { 
      console.log('---------------hellllo from saga ----posting new lesson', action.payload); 
      yield axios.post('/api/answer', {questionId: action.payload});
    //   yield put({type: 'GET_ALL_LESSONS'}); 
    } catch (error) {
      console.log('Error with new lesson post:', error);
    }
  }


// aggregate all the sagas for the export 
function* answerSaga() {
    yield takeLatest('ADD_ANSWER', addAnswer)
}

export default answerSaga;

// const config = {
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: true,
// };