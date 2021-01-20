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
      yield axios.post('/api/answer', {
        questionId: action.payload.questionId, 
        answer: action.payload.answer, 
        lessonId: action.payload.lessonId, 
        correct: action.payload.correct
      }); 
      yield put({type: 'GET_ANSWER', payload: action.payload.lessonId});
    } catch (error) {
      console.log('Error with new lesson POST:', error);
    }
  }
// DELETE an answer from db 
function* deleteAnswer(action) {
  try { 
    yield axios.delete(`/api/answer/${action.payload.answerId}`);
    yield put({type: 'GET_ANSWER', payload: action.payload.lessonId});
  } catch (error) {
    console.log('Error with new lesson GET:', error);
  }
}

// EDIT an answer in the db
function* editAnswer(action) {
  try { 
    yield axios.put(`/api/answer/${action.payload.answerId}`, action.payload);
    yield put({type: 'GET_ANSWER', payload: action.payload.lessonId});
  } catch (error) {
    console.log('Error with new lesson PUT:', error);
  }
}

// aggregate all the sagas for the export 
function* answerSaga() {
    yield takeLatest('ADD_ANSWER', addAnswer)
    yield takeLatest('DELETE_ANSWER', deleteAnswer)
    yield takeLatest('GET_ANSWER', getAnswer)
    yield takeLatest('EDIT_ANSWER', editAnswer)
}

export default answerSaga;

// const config = {
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: true,
// };