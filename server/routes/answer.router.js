const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//  Get the answers for a specific lesson
router.get('/:questionId', (req, res) => {
  console.log('getting answer for question with id:', req.params.questionId); 
  let queryText = `SELECT * FROM "lesson" 
  JOIN "question" ON question.lesson_id = lesson.id
  JOIN "answer" ON answer.question_id = question.id
  WHERE lesson.id = 36`; 
  pool.query(queryText)
  .then( (result) => {
      console.log(result.rows)
      res.send(result.rows);
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  });
}); 

// POST a new answer 
router.post('/', (req, res) => {
  console.log('POSTING answer for question with id:', req.body.questionId);  
  let questionId = req.body.questionId;
  let answer = req.body.answer;
  let queryText = `INSERT INTO "answer" ( "answer", "question_id") 
  VALUES ($1, $2);`; 
  pool.query(queryText, [answer, questionId])
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
  console.log('DELETING answer with id:', req.params.answerId);  
  console.log('DELETING answer with id:', req.params);  
  let answerId = req.params.answerId;
  let queryText = `DELETE FROM "answer" WHERE answer.id = $1;`; 
  pool.query(queryText, [answerId])
  .then( (result) => {
      res.sendStatus(200); 
      console.log(result)
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  });
}); 

// UPDATE answer already in the db
router.put('/:answerId', (req, res) => {
  console.log('UPDATING answer with id:', req.body.questionId); 
  let answerId = req.body.answerId; 
  let answer = req.body.answer; 
  let queryText = `UPDATE "answer" SET "answer" = $1 WHERE answer.id = $2;`; 
  pool.query(queryText, [answer, answerId])
  .then( (result) => {
      res.sendStatus(200); 
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  }); 
});
  

module.exports = router;
