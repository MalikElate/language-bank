const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // Add query to get all lessons for a specific user
  const userId = req.user.id; 
  console.log('Getting lessons for user with id:', req.user.id); 
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
    const description = req.body.description;
    const notes = req.body.notes; 
    const name = req.body.lessonName; 
    const language = req.body.language; 
    const public = req.body.public; 
    const lesson_owner_id = req.body.lesson_owner_id; 
    const queryText = `INSERT INTO "lesson" ("description", "notes", "name", "language", "public", "lesson_owner_id") 
    VALUES ($1, $2, $3, $4, $5, $6);`;
    pool.query(queryText, [description, notes, name, language, public, lesson_owner_id])
      .then(() => res.sendStatus(201))
      .catch( (error) => {
        console.log(`Error on post lesson query ${error}`);
        // res.sendStatus(500);
        res.send(error)
    });
  }); 


module.exports = router;
