import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

import Editable from './Editable.jsx';

import LaneActions from '../actions/LaneActions';


import {DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const noteTarget = {

  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(!targetProps.lane.notes.length) {
      LaneActions.attachToLane({
        laneId: targetProps.lane.id,
        noteId: sourceId
      });
    }
  }
};

@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))


export default class Lane extends React.Component {

  constructor(props) {
    super(props);

    const id = props.lane.id;

    this.addNote = this.addNote.bind(this, id);
    this.deleteNote = this.deleteNote.bind(this, id);

    this.editName = this.editName.bind(this, id);
    this.activateLaneEdit = this.activateLaneEdit.bind(this, id);
  }

  render() {
    const {connectDropTarget, lane, ...props} = this.props;

    return connectDropTarget(
      <div {...props}>
        <div className="lane-header">
          <div className="lane-name" editing={lane.editing}
            value={lane.name} onEdit={this.editName}
            onValueClick={this.activateLaneEdit} />
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          /* new getter is used to filter notes */
          inject={{
            notes: () => NoteStore.get(lane.notes)
          }}
        >
          <Notes
            onValueClick={this.activateNoteEdit}
            onEdit={this.editNote}
            onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }

  addNote(laneId) {
    const note = NoteActions.create({task: 'New task'});

    LaneActions.attachToLane({
      noteId: note.id,
      laneId
    });
  }

  editNote(id, task) {
    NoteActions.update({id, task, editing: false});
  }

  deleteNote(laneId, noteId) {
    LaneActions.detachFromLane({laneId, noteId});
    NoteActions.delete(noteId);
  }

  editName(id, name) {
    if(name) {
      LaneActions.update({id, name, editing: false});
    }
    else {
      LaneActions.delete(id);
    }
  }

  activateLaneEdit(id) {
    LaneActions.update({id, editing: true});
  }

  activateNoteEdit(id) {
    NoteActions.update({id, editing: true});
  }
}

// {lane, ...props} = this.props;
// is Object rest/spread Initializer
// This allows us to attach a className to Lane
// https://github.com/sebmarkbage/ecmascript-rest-spread/blob/master/Spread.md

// let aClone = { ...a };
// => let aClone = Object.assign({}, a);

// let aWithDefaults = { x: 1, y: 2, ...a };
// => let aWithDefaults = Object.assign({}, { x: 1, y: 2 }, a);