import React, { Component } from "react";
import Body from "../body"

/**
 * Full description of an item
 * Contains
 * - Name with link to its own page
 * - kindString
 * - Its body (see body.js)
 */
export default ({ data }) => {
  if(!data) return null

  return (
    <div className="leaf" id={"id" + data.id} key={"key_" + data.id + "_leaf"}>
      <Body data={data} isLeaf={true}/>
    </div>
  );
};
