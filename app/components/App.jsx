import AltContainer from 'alt-container';

import React from 'react';
import Notes from './Notes.jsx';

import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {

  render() {

    return (
      <div>

        <button className="add-note" onClick={this.addNote}>+</button>

        {/* AltContainer allows us to bind data to its immediate children.
        In this case, it injects the notes property in to Notes. */}
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getState().notes
          }} >

        <Notes
          onEdit={this.editNote}
          onDelete={this.deleteNote} />

        </AltContainer>
      </div>
      );
  }

  addNote() {
    NoteActions.create({task: 'New task'});
  }

  deleteNote(id) {
    NoteActions.delete(id);
  }

  editNote(id, task) {
    NoteActions.update({id, task});
  }


}
