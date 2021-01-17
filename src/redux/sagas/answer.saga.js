import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// GET all the answers from the db 
function* getAnswer(action) {
  try { 
    const response = yield axios.get(`/api/answer/${action.payload}`);
    yield put({type: 'SET_ANSWER', payload: response.data}); 
  } catch (error) {
    console.log('Error with new lesson GET', error);
  }
}

// POST a answer to the db
function* addAnswer(action) {
    try { 
      yield axios.post('/api/answer', {questionId: action.payload.questionId, answer: action.payload.answer});
      yield put({type: 'GET_ANSWER', payload: action.payload.lessonId});
    } catch (error) {
      console.log('Error with new lesson POST:', error);
    }
  }
// DELETE an answer from db 
function* deleteAnswer(action) {
  try { 
    console.log('--------DELETING answer----------------', action.payload); 
    yield axios.delete(`/api/answer/${action.payload.answerId}`);
    yield put({type: 'GET_ANSWER', payload: action.payload.lessonId});
  } catch (error) {
    console.log('Error with new lesson GET:', error);
  }
}

// aggregate all the sagas for the export 
function* answerSaga() {
    yield takeLatest('ADD_ANSWER', addAnswer)
    yield takeLatest('DELETE_ANSWER', deleteAnswer)
    yield takeLatest('GET_ANSWER', getAnswer)
}

export default answerSaga;

// const config = {
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: true,
// };