import React from "react";
import scrollTo from "gatsby-plugin-smoothscroll"

export default ({ data }) => {
  const children = data.childrenSymbol
  
  return (
    <div>
      {children.size !== 0 && 
        <div className="subsubtitle">Children</div>}
      <ul>
        {children.map(child => (
          <li onClick={() => scrollTo("#id" + child.id)}>{child.name} : {child.kindString}</li>
        ))}
      </ul>

    </div>
  );
};
