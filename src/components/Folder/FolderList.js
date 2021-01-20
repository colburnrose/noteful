import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Context from "../../NotefulContext";

export default class FolderList extends Component {
  static contextType = Context;

  render() {
    const foldersList = this.context.folders.map((folder, i) => (
      <li key={i}>
        <NavLink to={`/folder/${folder.id}`} activeClassName="active">
          {folder.name}
        </NavLink>
      </li>
    ));
    return (
      <aside>
        <h2>Folders</h2>
        <Link to="/add/folder">Add Folder</Link>
        <nav>
          <ul className="Folder-List">{foldersList}</ul>
        </nav>
      </aside>
    );
  }
}
