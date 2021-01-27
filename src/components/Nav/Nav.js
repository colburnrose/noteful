import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <nav className="Nav">
      <Link to={"/"}>Noteful</Link>
    </nav>
  );
}
