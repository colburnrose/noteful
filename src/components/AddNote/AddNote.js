import React, { Component } from "react";
import config from "../../config";
import Context from "../../NotefulContext";

export default class AddNote extends Component {
  state = {
    name: "",
    modified: new Date(),
    folderId: "",
    content: "",
    error: null,
  };
  static contextType = Context;

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
      .then((data) => this.context.addNote(data))
      .catch((error) => this.setState({ error }));
  };

  render() {
    const folderSelection = this.context.folders.map((folder) => {
      return (
        <option value={folder.id} key={folder.id}>
          {folder.name}
        </option>
      );
    });
    const { addNote } = this.context;

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
