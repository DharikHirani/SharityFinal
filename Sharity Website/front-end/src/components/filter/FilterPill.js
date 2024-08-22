import React from "react";
import { Dropdown } from "react-bootstrap";

export default function FilterPill({ children, selected, className = "" }) {
  const classes = className + " mt-2";
  return (
    <Dropdown.Toggle
      variant={selected ? "primary" : "outline-primary"}
      size="sm"
      id="filter-1"
      className={classes}
      style={{
        borderRadius: 20,
      }}
    >
      {children}
    </Dropdown.Toggle>
  );
}
