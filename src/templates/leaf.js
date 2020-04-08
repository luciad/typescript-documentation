import React from "react";
import About from "./about"

export default ({ data }) => {
  const leaf = data
  
  return (
    <div className="function">
      <div className="title">{leaf.name}</div>
      <div className="kindString">{leaf.kindString}</div>
      <About data={leaf}/>
    </div>
  );
};
