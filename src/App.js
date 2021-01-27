import React, { Component } from "react";
import Nav from "./components/Nav/Nav";
import Note from "./components/Note/Note";
import Notes from "./components/Notes/Notes";
import FolderList from "./components/Folder/FolderList";
import AddFolder from "./components/AddFolder/AddFolder";
import AddNote from "./components/AddNote/AddNote";
import ErrorBoundary from "./components/ErrorBoundary";
import Context from "./NotefulContext";
import config from "./config";

import { Route } from "react-router-dom";

import "./App.css";

class App extends Component {
  state = {
    folders: [],
    notes: [],
  };

  getFolders() {
    fetch(`${config.API_ENDPOINT}/folders`)
      .then((res) => {
        if (!res.ok) {
          return new Error("Something went wrong during the request!");
        }
        return res.json();
      })
      .then((data) => this.setState({ folders: data }))
      .catch((error) => console.log(error));
  }

  getNotes() {
    fetch(`${config.API_ENDPOINT}/notes`)
      .then((res) => {
        if (!res.ok) {
          return new Error("Something went wrong during the request!");
        }
        return res.json();
      })
      .then((data) => this.setState({ notes: data }))
      .catch((error) => console.log(error));
  }

  addFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder],
    });
  };

  addNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };

  componentDidMount() {
    this.getFolders();
    this.getNotes();
  }

  render() {
    const { notes } = this.state;
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.addFolder,
      addNote: this.addNote,
    };

    return (
      <ErrorBoundary>
        <Context.Provider value={contextValue}>
          <main className="App">
            <Nav />
            <div className="Content">
              <Route path="/add/folder" component={AddFolder} />
              <Route path="/" component={FolderList} />
            </div>
            <div className="Note-Content">
              <Route
                exact
                path={["/", "/folder/:folderid"]}
                component={Notes}
              />
              <Route
                exact
                path="/note/:noteid"
                render={(rprops) => <Note {...rprops} notes={notes} />}
              />
              <Route path="/add/note" component={AddNote} />
            </div>
          </main>
        </Context.Provider>
      </ErrorBoundary>
    );
  }
}

export default App;
