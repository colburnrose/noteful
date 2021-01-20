import React, { Component } from "react";
import { Link } from "react-router-dom";
import Note from "../Note/Note";
import Context from "../../NotefulContext";
import "./Notes.css";

class Notes extends Component {
  static contextType = Context;

  render() {
    const { folderid = null } = this.props.match.params || null;
    const notes = folderid
      ? this.context.notes.filter((n) => n.folderId === folderid)
      : this.context.notes;
    return (
      <section className="Note_List">
        <ul>
          {notes.map((note, i) => (
            <li key={i}>
              <Note id={note.id} name={note.name} modified={note.modified} />
            </li>
          ))}
        </ul>
        <section className="Add-Note">
          <Link to="/add/note">Add Note</Link>
        </section>
      </section>
    );
  }
}

export default Notes;
