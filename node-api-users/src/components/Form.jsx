import React, { Component } from "react";
import axios from "axios";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.state
    };
  }

  onChangeHandler = evt => {
    console.log(evt.target);
    this.setState({
      ...this.state,
      editing: {
        ...this.state.editing,
        [evt.target.name]: evt.target.value,
        updated_at: Date.now()
      }
    });
  };

  editUser = (id, user) => {
    id = this.state.editing.id;
    user = this.state.editing;
    axios
      .put(`http://localhost:5000/api/users/${id}`, user)
      .then(res => {
        console.log(res);
        this.setState({ ...this.state, isEditing: false });
      })
      .catch(err => console.log(err));
  };

  onSubmitHandler = () => {
    this.editUser();
  };

  render() {
    // console.log("state", this.state);
    return (
      <>
        <form onSubmit={this.onSubmitHandler}>
          <label>Name:</label>
          <input
            name="name"
            type="text"
            value={this.state.editing.name}
            onChange={this.onChangeHandler}
          />
          <label>Bio: </label>
          <input
            name="bio"
            type="text"
            value={this.state.editing.bio}
            onChange={this.onChangeHandler}
          />
          <input type="submit" />
        </form>
      </>
    );
  }
}
