const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//  Get the answers for a specific lesson
router.get('/:questionId', (req, res) => {
  const questionId = req.params.questionId
  const queryText = `SELECT * FROM "lesson" 
  JOIN "question" ON question.lesson_id = lesson.id
  JOIN "answer" ON answer.question_id = question.id
  WHERE lesson.id = $1`; 
  pool.query(queryText, [questionId])
  .then( (result) => {
      res.send(result.rows);
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  });
}); 

// POST a new answer 
router.post('/', (req, res) => {
  const questionId = req.body.questionId;
  const answer = req.body.answer;
  const lessonId = req.body.lessonId;
  const correct = req.body.correct;
  const queryText = `INSERT INTO "answer" ( "answer", "question_id", "correct", "lesson_id") 
  VALUES ($1, $2, $3, $4);`; 
  console.log('questionId', req.body.questionId, 'answer', req.body.answer, 'lessonId', req.body.lessonId, 'correct', req.body.correct); 
  pool.query(queryText, [answer, questionId, correct, lessonId])
  .then( (result) => {
      res.sendStatus(201); 
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  });
}); 

// DELETE answer already in the db
router.delete('/:answerId', (req, res) => {
  const answerId = req.params.answerId;
  const queryText = `DELETE FROM "answer" WHERE answer.id = $1;`; 
  pool.query(queryText, [answerId])
  .then( (result) => {
      res.sendStatus(200); 
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  });
}); 

// UPDATE answer already in the db
router.put('/:answerId', (req, res) => {
  const answerId = req.body.answerId; 
  const answer = req.body.answer; 
  const correct = req.body.correct; 
  const queryText = `UPDATE "answer" SET "answer" = $1, "correct" = $2 WHERE answer.id = $3;`; 
  pool.query(queryText, [answer, correct, answerId])
  .then( (result) => {
      res.sendStatus(200); 
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  }); 
});
  

module.exports = router;
