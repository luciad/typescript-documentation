import React from "react";

/**
 * returns div containing icon of given kindString or (kindString) if there is no icon specified
 */
export default ({ kindString }) => {
  if(!kindString) return null

  return (
    <div className="icon">
      <img className={"icon_" + kindString.replace(/\s/g, "_")} title={kindString} alt=""/>
      </div>
  )
};
