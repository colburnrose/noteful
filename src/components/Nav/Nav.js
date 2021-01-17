import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../NotefulContext";
import "./Nav.css";

export default function Nav() {
  const context = useContext(Context);
  return (
    <nav className="Nav">
      <Link to={"/"}>Noteful</Link>
    </nav>
  );
}
