//bring in router for notes
const notes = require('express').Router();

//bring in fs helper functions
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils.js');

//retrieve all notes 
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:title', (req, res) => {
    const tipId = req.params.title;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.title === title);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that title');
      });
  });

// delete specific note by its title
notes.delete('/:title', (req, res) => {
    const title = req.params.title;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        
        const result = json.filter((note) => note.title !== title);

     
        writeToFile('./db/db.json', result);


        res.json(`Item ${title} has been deleted 🗑️`);
    });
});

//post route for new note
notes.post('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (req.body) {
      const newNote = {
        title,
        text
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
    } else {
    res.error('Error in adding note');
    }
});

module.exports = notes;

