import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Form from "./components/Form";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isEditing: false,
      editing: {},
      creating: false
    };
  }

  componentWillMount() {
    this.getUsers();
  }

  getUsers = () =>
    axios
      .get("http://localhost:5000/api/users")
      .then(res => {
        // console.log(res.data);
        this.setState({ ...this.state, users: res.data });
      })
      .catch(err => {
        console.log("get users", err);
      });

  editUserById = id => {
    axios
      .get(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        console.log(res);
        this.setState({ ...this.state, isEditing: true, editing: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  removeUser = id =>
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        console.log(res.data);
        // this.setState({ ...this.state, users: res.data });
        this.getUsers();
      })
      .catch(err => {
        console.log("get users", err);
        this.getUsers();
      });

  render() {
    return this.state.isEditing || this.state.creating ? (
      <Form state={this.state} />
    ) : (
      <>
        <button
          onClick={() => this.setState({ ...this.state, creating: true })}
        >
          CREATE CHARACTER
        </button>
        <div className="wrapper">
          {this.state.users.map(user => {
            return (
              <div className="user-card" key={user.id}>
                <p>Name: {user.name}</p>
                <p>Bio: {user.bio}</p>
                <p>Created: {user.created_at}</p>
                <p>Updated: {user.updated_at}</p>
                <div className="btn-div">
                  <button onClick={() => this.editUserById(user.id)}>
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      this.removeUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
