const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:lessonId', (req, res) => {
  // Add query to get all questions and answers for a specific user 
  console.log('getting questions for lesson with id:', req.params.lessonId); 
  let lessonId = req.params.lessonId; 
  let queryText = `SELECT question.question, question.id, question.lesson_id FROM "lesson" 
  JOIN "question" ON question.lesson_id = lesson.id
  WHERE lesson.id = $1;`; 
  pool.query(queryText, [lessonId])
  .then( (result) => {
      console.log(result.rows)
      res.send(result.rows);
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  }); 
}); 


router.post('/:lessonId', (req, res) => {
  // Add query to get all questions and answers for a specific user 
  console.log('POSTING question for lesson with id:', req.params.lessonId); 
  let lessonId = req.params.lessonId; 
  let queryText = `INSERT INTO "question" ( "question", "lesson_id") 
  VALUES ('new question inserted with button', $1);`; 
  pool.query(queryText, [lessonId])
  .then( (result) => {
      res.sendStatus(201); 
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  }); 
});
router.delete('/:questionId', (req, res) => {
  // Add query to get all questions and answers for a specific user 
  console.log('DELETING question with id:', req.params.questionId); 
  let questionId = req.params.questionId; 
  let queryText = `DELETE FROM "question" WHERE question.id = $1;`; 
  pool.query(queryText, [questionId])
  .then( (result) => {
      res.sendStatus(204); 
  })
  .catch( (error) => {
        console.log(`Error on query ${error}`);
        res.sendStatus(500);
    }); 
  });
  


module.exports = router;
