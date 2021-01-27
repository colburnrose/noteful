import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Note.css";

export default function Note(props) {
  // const context = useContext(Context);
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
      <button className="Note_delete" type="button">
        Delete Note
      </button>
    </div>
  );
}

Note.defaultProps = {
  name: "",
  content: "",
};

Note.propTypes = {
  name: PropTypes.string,
  modified: PropTypes.string,
  content: PropTypes.string,
};
