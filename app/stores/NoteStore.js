// To generate unique uuid
import uuid from 'node-uuid';

// Assigns enumerable own properties of source objects to the target object and returns the target object.
// Additional source objects will overwrite previous ones.
import assign from 'object-assign';

import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

// Alt uses standard ES6 classes
class NoteStore {
  constructor() {
    // connect the action with the Store
    this.bindActions(NoteActions);

    this.notes = [];

    // add public method
    this.exportPublicMethods({
      get: this.get.bind(this)
    });
  }

  // create action
  create(note) {
    const notes = this.notes;

    note.id = uuid.v4();

    this.setState({ // alter the state -> send signal to the listeners
      notes: notes.concat(note)
    });

    return note;
  }

  update(updatedNote) {
    const notes = this.notes.map((note) => {
      if(note.id === updatedNote.id) {
        return assign({}, note, updatedNote); // overwrite
      }
      return note;
    });

    this.setState({notes}); // commit the new state {notes: notes}
  }

  delete(id) {
    this.setState({
      notes: this.notes.filter((note) => note.id !== id)
    });
  }

  get(ids) {
    return (ids || []).map(
      (id) => this.notes.filter((note) => note.id === id)
    ).filter((a) => a.length).map((a) => a[0]);
  }

}

export default alt.createStore(NoteStore, 'NoteStore');


// We call bindActions to map each action to a method by name. We trigger the
// appropriate logic at each method based on that.
// Finally, we connect the store with Alt using alt.createStore.

// It is recommended that you use setState with Alt to keep things clean and easy to understand.
// Manipulating this.notes directly would work, but that would miss the intent and
// could become problematic in larger scale as mutation is difficult to debug.
// setState provides a nice analogue to the way React works so it's worth using.


