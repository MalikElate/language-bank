const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET questions from the db
router.get('/:lessonId', (req, res) => {
  console.log('getting questions for lesson with id:', req.params.lessonId); 
  let lessonId = req.params.lessonId; 
  let queryText = `SELECT question.question, question.id, question.lesson_id FROM "lesson" 
  JOIN "question" ON question.lesson_id = lesson.id
  WHERE lesson.id = $1 ORDER BY question.id DESC;`; 
  pool.query(queryText, [lessonId])
  .then( (result) => {
    res.send(result.rows);
  })
  .catch( (error) => {
    console.log(`Error on query ${error}`);
    res.sendStatus(500);
  }); 
}); 

// POST questions tot the db
router.post('/:lessonId', (req, res) => {
  console.log(`POSTING question ${req.body.question} for lesson with id:, ${req.params.lessonId}`); 
  let lessonId = req.params.lessonId; 
  let queryText = `INSERT INTO "question" ( "question", "lesson_id") 
  VALUES ($1, $2);`; 
  pool.query(queryText, [req.body.question, lessonId])
  .then( (result) => {
    res.sendStatus(201); 
  })
  .catch( (error) => {
    console.log(`Error on query ${error}`);
    res.sendStatus(500);
  }); 
});

// DELETE questions from the db
router.delete('/:questionId', (req, res) => {
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

// UPDATE questions already in the db
router.put('/:questionId', (req, res) => {
  console.log('UPDATING question with id:', req.body.questionId); 
  let questionId = req.body.questionId; 
  let question = req.body.question; 
  let queryText = `UPDATE "question" SET "question" = $1 
  WHERE question.id = $2;`; 
  pool.query(queryText, [question, questionId])
  .then( (result) => {
      res.sendStatus(200); 
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  }); 
});
  


module.exports = router;
