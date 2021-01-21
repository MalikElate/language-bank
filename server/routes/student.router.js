const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Get all the students who have taken a course 
router.get('/', (req, res) => {
  // GET route code here
});

// Add a new student to the db
router.post('/', (req, res) => {
  // POST route code here
  const name = req.body.name;
  const answer = req.body.answer;
  const className = req.body.class;
  const lessonId = req.body.lessonId;
  const queryText = `INSERT INTO "student" ( "name", "email", "class", "lesson_id") 
  VALUES ('student name', 'example@example.com', 'class name', 2); `; 
  console.log(name, answer, className, lessonId); 
  pool.query(queryText)
  .then( (result) => {
      res.sendStatus(201); 
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  });
  res.sendStatus(200)
});

module.exports = router;
