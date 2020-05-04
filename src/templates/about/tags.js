import React from "react"
import Text from "./text"

export default ({ tags }) => {
  return (
    <div>
      {tags.length !== 0 && 
        <div className="subsubtitle">Tags</div>}
      <ul>
        {tags.map(tag => (
          <li className="sidecontainer">{tag.tag}: &nbsp; <Text data={tag.text}/></li>
        ))}
      </ul>
    </div>
  );
};
