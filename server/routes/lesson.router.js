const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  // Add query to get all lessons for a specific user
  const queryText = 'SELECT * from "lesson" WHERE public = true;'; 
  pool.query(queryText)
  .then( (result) => {
      res.send(result.rows);
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  });
}); 

// get an individual users lessons
router.get('/user', (req, res) => {
  // Add query to get all lessons for a specific user
  const userId = req.user.id; 
  const queryText = 'SELECT * from "lesson" WHERE lesson_owner_id = $1;'; 
  pool.query(queryText, [userId])
  .then( (result) => {
      res.send(result.rows);
  })
  .catch( (error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
  });
}); 

// individual user can create a lesson
router.post('/', (req, res) => {
  // POST route code here
    const description = req.body.description;
    const notes = req.body.notes; 
    const name = req.body.lessonName; 
    const language = req.body.language; 
    const public = req.body.public; 
    const difficulty = req.body.difficulty; 
    const country = req.body.country; 
    const lesson_owner_id = req.body.lesson_owner_id; 
    const queryText = `INSERT INTO "lesson" ("description", "notes", "name", "language", "difficulty", "country", "public", "lesson_owner_id") 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    pool.query(queryText, [description, notes, name, language, difficulty, country, public, lesson_owner_id])
      .then(() => res.sendStatus(201))
      .catch( (error) => {
        console.log(`Error on post lesson query ${error}`);
        // res.sendStatus(500);
        res.send(error)
    });
  }); 

  // delete a users lesson 
  router.delete('/:lessonId', (req, res) => {
    const lessonId = req.params.lessonId; 
    const answerQueryText =  `DELETE FROM "answer" WHERE answer.lesson_id = $1;`; 
    const questionQueryText = `DELETE FROM "question" WHERE question.lesson_id = $1;`; 
    const lessonQueryText = `DELETE FROM "lesson" WHERE lesson.id = $1;`; 
    const studentQueryText = `DELETE FROM "student" WHERE student.lesson_id = $1;`; 
    // answer query deletes all answers for a question
    pool.query(answerQueryText, [lessonId])
    .then( (result) => {
      pool.query(questionQueryText, [lessonId])
      .then( (result) => {
        pool.query(lessonQueryText, [lessonId])
          .then( (result) => {
            pool.query(studentQueryText, [lessonId])
              .then(() => res.sendStatus(204))
              .catch( (error) => {
                console.log(`Error on query ${error}`);
                res.sendStatus(500);
              });
          })
          .catch( (error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
          });
      })
      .catch( (error) => {
          console.log(`Error on query ${error}`);
          res.sendStatus(500);
      });
    })
    .catch( (error) => {
        console.log(`Error on query ${error}`);
        res.sendStatus(500);
    });
  });

module.exports = router;
