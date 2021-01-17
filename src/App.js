import React, { Component } from "react";
import Nav from "./components/Nav/Nav";
import Note from "./components/Note/Note";
import Notes from "./components/Notes/Notes";
import FolderList from "./components/Folder/FolderList";
import Context from "./NotefulContext";
import LIST from "./dummy-store";

import { Route } from "react-router-dom";

import "./App.css";

class App extends Component {
  state = {
    folders: [],
    notes: [],
  };

  componentDidMount() {
    this.setState({
      folders: LIST.folders,
      notes: LIST.notes,
    });
  }

  render() {
    const { notes, folders } = this.state;
    return (
      <Context.Provider value={this.state}>
        <main className="App">
          <Nav />
          <div className="Content">
            <Route
              path="/"
              render={(rprops) => <FolderList folders={folders} />}
            />
          </div>
          <div className="Note-Content">
            <Route
              exact
              path={["/", "/folder/:folderid"]}
              render={(rprops) => (
                <Notes
                  {...rprops}
                  notes={
                    rprops.match.params.folderid
                      ? notes.filter(
                          (n) => n.folderId === rprops.match.params.folderid
                        )
                      : notes
                  }
                />
              )}
            />
            <Route
              exact
              path="/note/:noteid"
              render={(rprops) => <Note {...rprops} notes={notes} />}
            />
          </div>
        </main>
      </Context.Provider>
    );
  }
}

export default App;
