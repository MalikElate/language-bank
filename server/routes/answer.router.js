const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:questionId', (req, res) => {

  // Add query to get all questions and answers for a specific user 
  console.log('getting answer for question with id:', req.params.questionId); 
  let questionId = req.params.questionId;
  let queryText = `SELECT answer.answer, answer.question_id FROM "answer" 
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

module.exports = router;
