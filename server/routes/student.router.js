const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Get all the students who have taken a course 
router.get('/', (req, res) => {
  // GET route code here
});

// Add a new student to the db
router.post('/', (req, res) => {
  const name = req.body.name;
  const className = req.body.class;
  const lessonId = req.body.lessonId;
  const email = req.body.email;
  const queryText = `INSERT INTO "student" ( "name", "email", "class", "lesson_id") 
  VALUES ( $1, $2, $3, $4); `; 
  console.log('IN STUDENT ROUTE name, className, lessonId',name, className, email, lessonId); 
  pool.query(queryText, [name, email, className, lessonId])
  .then( (result) => {
      res.sendStatus(201); 
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  });
});

module.exports = router;
