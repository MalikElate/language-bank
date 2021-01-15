const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//  Get the answers for a specific question 
router.get('/:questionId', (req, res) => {
  console.log('getting answer for question with id:', req.params.questionId); 
  let questionId = req.params.questionId;
  let queryText = `SELECT answer.answer, answer.id FROM "answer" 
  JOIN "question" ON question.id = answer.question_id
  WHERE question.id = $1;`; 
  pool.query(queryText, [questionId])
  .then( (result) => {
      console.log(result.rows)
      res.send(result.rows);
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  });
}); 

// POST a new answer for a question
router.post('/', (req, res) => {
  console.log('POSTING answer for question with id:', req.body.questionId);  
  let questionId = req.body.questionId;
  let queryText = `INSERT INTO "answer" ( "answer", "question_id") 
  VALUES ('inserted question', $1);`; 
  pool.query(queryText, [questionId])
  .then( (result) => {
      res.sendStatus(201); 
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  });
}); 

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

module.exports = router;
