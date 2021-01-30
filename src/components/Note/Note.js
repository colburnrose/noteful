import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Note.css";
import config from "../../config";
import Context from "../../NotefulContext";

export default function Note(props) {
  const context = useContext(Context);
  function handleClickDelete(e) {
    e.preventDefault();

    let noteId = props.id ? props.id : 0;
    noteId =
      props.match && props.match.params && props.match.params.noteid
        ? props.match.params.noteid
        : noteId;

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw Promise.reject(EvalError);
          });
        }
        context.deleteNote(noteId);
        if (props.match && props.match.params && props.match.params.noteid) {
          props.history.push("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const note = props.notes
    ? props.notes.find((n) => n.id === props.match.params.noteid)
    : props;
  return note ? (
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
  ) : (
    <h2>Loading...</h2>
  );
}

Note.propTypes = {
  name: PropTypes.string,
  modified: PropTypes.string,
  content: PropTypes.string,
};
