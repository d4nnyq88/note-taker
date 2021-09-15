const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for saved notes
notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for saving a note
notes.post('/', (req, res) => {
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note saved successfully 🚀`);
    } else {
      res.error('Error in saving note');
    }
});

// POST Route for deleting a note

notes.delete('/:id', async (req, res) => {

  const { id } = req.params;

  if (id) {
    
    const currentNotes = await readFromFile('./db/db.json').then((data) => JSON.parse(data));    
    
    const updatedNotes = currentNotes.filter(note => note.id !== id);

    writeToFile('./db/db.json', updatedNotes);
    res.json('Note successfuly deleted 🚀');
  } else {
    res.error('Error in deleting note');
  }
});

module.exports = notes;