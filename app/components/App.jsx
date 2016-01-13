import AltContainer from 'alt-container';
import React from 'react';

import Lanes from './Lanes.jsx';

import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

export default class App extends React.Component {

  render() {

    return (
      <div>

        <button className="add-lane" onClick={this.addLane}>+</button>

        {/* AltContainer allows us to bind data to its immediate children.
        In this case, it injects the notes property in to Notes. */}
        <AltContainer
          stores={[LaneStore]}
          inject={{
            lanes: () => LaneStore.getState().lanes
          }} >

        <Lanes />

        </AltContainer>
      </div>
      );
  }

  addLane() {
    LaneActions.create({task: 'New lane'});
  }

}
