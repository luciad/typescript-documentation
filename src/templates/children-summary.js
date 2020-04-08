import React from "react";
import scrollTo from "gatsby-plugin-smoothscroll"
import Icon from "./icon"

export default ({ data }) => {
  const children = data.childrenSymbol
  
  return (
    <div>
      {children.size !== 0 && 
        <div className="subsubtitle">Children</div>}
      <ul>
        {children.map(child => (
          <li onClick={() => scrollTo("#id" + child.id)}>
            <div className="sidecontainer">
            <Icon kindString={child.kindString}/>
            &nbsp; &nbsp; 
              {child.name}
            </div>
          </li>

        ))}
      </ul>

    </div>
  );
};
