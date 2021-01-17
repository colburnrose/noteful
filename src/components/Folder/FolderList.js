import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Context from "../../NotefulContext";

export default function FolderList(props) {
  const context = useContext(Context);
  const foldersList = context.folders.map((folder, i) => (
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
