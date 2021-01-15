const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // Add query to get all lessons for a specific user
  let userId = req.user.id; 
  console.log('Getting lessons for user with id:', req.user.id); 
  let queryText = 'SELECT * from "lesson" WHERE lesson_owner_id = $1;'; 
  pool.query(queryText, [userId])
  .then( (result) => {
      res.send(result.rows);
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  });
}); 
router.get('/questions/:lessonId', (req, res) => {
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
router.get('/answers/:questionId', (req, res) => {

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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
    const description = req.body.description;
    const notes = req.body.notes; 
    const name = req.body.lessonName; 
    const language = req.body.language; 
    const lesson_owner_id = req.body.lesson_owner_id; 
    const queryText = `INSERT INTO "lesson" ("description", "notes", "name", "language", "lesson_owner_id") 
    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [description, notes, name, language, lesson_owner_id])
      .then(() => res.sendStatus(201))
      .catch( (error) => {
        console.log(`Error on post lesson query ${error}`);
        // res.sendStatus(500);
        res.send(error)
    });
  }); 


module.exports = router;
