import React, { Component } from "react";
import { Link } from "react-router-dom";
import Note from "../Note/Note";
import "./Notes.css";

class Notes extends Component {
  render() {
    return (
      <section className="Note_List">
        <ul>
          {this.props.notes.map((note, i) => (
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
