import React from 'react';
import Notes from './Notes.jsx';

import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
  // Set props and state
  constructor(props) {
    super(props);

    this.state = NoteStore.getState();
  }

  // React lifecycles hooks
  componentDidMount() {
    console.log("componentDidMount");
    NoteStore.listen(this.storeChanged);
  }
  componentWillUnmount() {
    console.log("componentWillUnmoun");
    NoteStore.unlisten(this.storeChanged);
  }

  // Class property
  storeChanged = (state) => {
    // Without a property initializer `this` wouldn't
    // point at the right context (defaults to `undefined` in strict mode).
    this.setState(state);
  };

  render() {

    const notes = this.state.notes;

    return (
      <div>

        <button className="add-note" onClick={this.addNote}>+</button>

        <Notes notes={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote} />

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
