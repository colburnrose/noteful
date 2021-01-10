import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function FolderList(props) {
  const folderList = props.folders.map((folder, i) => (
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
        <ul className="Folder-List">{folderList}</ul>
      </nav>
    </aside>
  );
}
