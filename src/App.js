import React, { Component } from "react";
import Nav from "./components/Nav/Nav";
import Note from "./components/Note/Note";
import Notes from "./components/Notes/Notes";
import LIST from "./dummy-store";

import { Route } from "react-router-dom";

import "./App.css";
import FolderList from "./components/Folder/FolderList";

class App extends Component {
  state = LIST;

  render() {
    const { notes } = this.state;
    return (
      <main className="App">
        <Nav />
        <div className="Content">
          <Route
            path="/"
            render={(rprops) => <FolderList folders={this.state.folders} />}
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
    );
  }
}

export default App;
