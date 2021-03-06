const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET questions from the db
router.get('/:lessonId', (req, res) => {
  const lessonId = req.params.lessonId; 
  const queryText = `SELECT question.question, question.id, question.lesson_id FROM "lesson" 
  JOIN "question" ON question.lesson_id = lesson.id
  WHERE lesson.id = $1 ORDER BY question.id DESC;`; 
  pool.query(queryText, [lessonId])
  .then( (result) => {
    res.send(result.rows);
    // console.log('result.rows from question get',result.rows)
  })
  .catch( (error) => {
    console.log(`Error on query ${error}`);
    res.sendStatus(500);
  }); 
}); 

// GET one questions from the db for the take lesson question page
router.get('/take-lesson/:lessonId', (req, res) => {
  // const lessonId = req.params.lessonId; 
  // const queryText = `SELECT question.question, question.id, question.lesson_id FROM "lesson" 
  // JOIN "question" ON question.lesson_id = lesson.id
  // WHERE lesson.id = $1 ORDER BY question.id DESC;`; 
  // pool.query(queryText, [lessonId])
  // .then( (result) => {
  //   res.send(result.rows);
  // })
  // .catch( (error) => {
  //   console.log(`Error on query ${error}`);
  //   res.sendStatus(500);
  // }); 
  res.sendStatus(200);
}); 


// POST questions tot the db
router.post('/:lessonId', (req, res) => {
  const lessonId = req.params.lessonId; 
  const queryText = `INSERT INTO "question" ( "question", "lesson_id") 
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
  const questionId = req.params.questionId; 
  const questionQueryText = `DELETE FROM "question" WHERE question.id = $1;`; 
  const answerQueryText =  `DELETE FROM "answer" WHERE answer.question_id = $1;`; 
  // answer query deletes all answers for a question
  pool.query(answerQueryText, [questionId])
  .then( (result) => {
    // question query deletes the answer itself
    pool.query(questionQueryText, [questionId])
    .then( (result) => {
        res.sendStatus(204); 
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

// UPDATE questions already in the db
router.put('/:questionId', (req, res) => {
  const questionId = req.body.questionId; 
  const question = req.body.question; 
  const queryText = `UPDATE "question" SET "question" = $1 
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
