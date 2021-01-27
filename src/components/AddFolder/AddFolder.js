import React, { Component } from "react";
import Context from "../../NotefulContext";
import PropTypes from "prop-types";
import config from "../../config";
import "./AddFolder.css";

export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  state = {
    name: "",
    error: null,
  };

  static contextType = Context;

  handleSubmit = (e) => {
    e.preventDefault();
    const folder = {
      name: e.target.folder.value,
    };

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      body: JSON.stringify(folder),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw Promise.reject(error);
          });
        }
        return res.json();
      })
      .then((data) => {
        e.target.folder.value = "";
        this.context.addFolder(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  render() {
    // const { addFolder } = this.context;
    return (
      <div className="AddFolder">
        <main>
          <form className="add-folder" onSubmit={this.handleSubmit}>
            <label htmlFor="addFolder">Folder name:</label>
            <input
              type="text"
              aria-label="folder name"
              placeholder="folder name"
              name="folder"
              id="add-folder"
            />
            <button type="submit">Save</button>
          </form>
        </main>
      </div>
    );
  }
}

AddFolder.propTypes = {
  name: PropTypes.string,
};
