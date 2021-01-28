import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Note.css";
import config from "../../config";

export default function Note(props) {
  function handleClickDelete(e) {
    e.preventDefault();

    const noteId = props.id;

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "applicaiton/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw Promise.reject(error.message);
          });
        }
        return res.json();
      })
      .then(() => this.context.deleteNote(noteId))
      .catch((error) => {
        console.log(error.message);
      });
  }

  const note = props.notes
    ? props.notes.find((n) => n.id === props.match.params.noteid)
    : props;
  return (
    <div className="Note">
      <h2 className="Note_title">
        <Link to={`/note/${note.id}`}>{note.name}</Link>
      </h2>
      <div className="Note_Date">
        <div className="Note_Date_Modified">
          Date Modified <span className="Date">{note.modified}</span>
        </div>
      </div>
      <button
        className="Note_delete"
        type="button"
        onClick={(e) => handleClickDelete(e)}
      >
        Delete Note
      </button>
    </div>
  );
}

Note.propTypes = {
  name: PropTypes.string,
  modified: PropTypes.string,
  content: PropTypes.string,
};
