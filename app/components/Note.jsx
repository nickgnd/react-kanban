import React from 'react';

// {task} allows us to extract the specific prop
// we want from the passed props easily.

export default class Note extends React.Component {
  constructor(props) {
    super(props);

    // track editing state
    this.state = {
      editing: false
    };
  }
  render() {
    // Render the component differently based on state
    if(this.state.editing) {
      return this.renderEdit();
    }

    return this.renderNote();
  }
  renderEdit = () => {
    // Deal with blur and input handlers. THese map to DOM events
    return <input type="text"
      autoFocus={true}
      placeholder={this.props.task}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />;
  };
  renderNote = () => {
    // If the user clicks a normal note, trigger editing logic
    return <div onClick={this.edit}>{this.props.task}</div>
  };
  edit = () => {
    // Enter edit mode
    this.setState({
      editing: true
    });
  };
  checkEnter = (e) => {
    // The user hit *enter*, let's finish up
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  };
  finishEdit = (e) => {
    // 'Note' will trigger an optional 'onEdit' callback once it
    // has a new value. We will use this to communicate the change to
    // 'App'.
    //
    // A smarter way to deal with the default value would be to set
    // it through 'defaultProps'.
    if(this.props.onEdit) {
      this.props.onEdit(e.target.value);
    }

    // Exit edit mode.
    this.setState({
      editing: false
    });
  };

}
