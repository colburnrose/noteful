import React, { Component } from "react";
import config from "../../config";
import Context from "../../NotefulContext";

export default class AddNote extends Component {
  state = {
    name: "",
    content: "",
    folder: "",
    folderId: "",
    datetime: new Date(),
    error: null,
  };
  static contextType = Context;

  // addNote Fetch Method
  render() {
    // handleSubmit
    return (
      <div className="AddNote">
        <main>
          <form className="add-note">
            <div>
              <label htmlFor="addNote">
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
              <label htmlFor="addContent">
                Content Name:
                <input
                  type="text"
                  name="content name"
                  placeholder="content"
                  aria-label="content name"
                />
              </label>
            </div>
            <div>
              <label htmlFor="addFolder">
                Folder Name:
                <input
                  type="text"
                  name="folder name"
                  placeholder="fold"
                  aria-label="folder name"
                />
              </label>
            </div>
            <button type="submit">Save Note</button>
          </form>
        </main>
      </div>
    );
  }
}
