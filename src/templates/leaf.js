import React from "react";
import About from "./body"
import Icon from "./icon"

export default ({ data }) => {
  const leaf = data
  console.log(data)
  return (
    <div className="function" id={"id" + leaf.id}>
      <div className="title">{leaf.name}</div>
      <div className="sidecontainer">
        <Icon kindString={leaf.kindString}/> 
        <div className="kindString">{leaf.kindString}</div>
        </div>
      <About data={leaf}/>
    </div>
  );
};
