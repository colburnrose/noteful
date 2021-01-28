import React, { Component } from "react";
import config from "../../config";
import Context from "../../NotefulContext";
import ValidateNoteError from "./ValidateNoteError";

export default class AddNote extends Component {
  state = {
    name: {
      value: "",
      error: false,
    },
    modified: {
      value: new Date(),
      error: false,
    },
    folderId: {
      value: "",
      error: false,
    },
    content: {
      value: "",
      error: false,
    },
  };
  static contextType = Context;

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 4) {
      return "Name must be at least 4 characters long";
    }
  }

  validateContent() {
    const content = this.state.content.value.trim();
    if (content.length === 0) {
      return "Content description is required";
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const note = {
      name: e.target.name.value,
      modified: new Date(),
      folderId: e.target.folderId.value,
      content: e.target.content.value,
    };

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not add note. ");
        }
        return res.json();
      })
      .then((data) => {
        this.props.history.push("/");
        this.context.addNote(data);
      })
      .catch((error) => this.setState({ error }));
  };

  render() {
    const nameError = this.validateName();
    const contentError = this.validateContent();

    const folderSelection = this.context.folders.map((folder) => {
      return (
        <option value={folder.id} key={folder.id}>
          {folder.name}
        </option>
      );
    });

    return (
      <div className="AddNote">
        <main>
          <form className="add-note" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="name">
                Note Name:
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  aria-label="note name"
                />
              </label>
              {this.state.name.error && (
                <ValidateNoteError message={nameError} />
              )}
            </div>
            <div>
              <label htmlFor="content">
                Content Name:
                <input
                  type="text"
                  name="content"
                  placeholder="content"
                  aria-label="content name"
                />
              </label>
              {this.state.content.error && (
                <ValidateNoteError message={contentError} />
              )}
            </div>
            <div>
              <label>
                Select a folder:{" "}
                <select name="folderId">{folderSelection}</select>
              </label>
            </div>
            <button type="submit">Save Note</button>
          </form>
        </main>
      </div>
    );
  }
}
