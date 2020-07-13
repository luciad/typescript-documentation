import React from "react"
import Text from "../text"

/**
 * Generates list of tags
 *
 * Contains:
 * - List of tag.tag and tag.text
 */
export default ({ tags }) => {
  if(!tags || tags.length === 0) return null
  return (
    <div>
      <div className="subsubtitle">Tags</div>
      <ul>
        {tags.map(tag => (
          <li className="sidecontainer" key={tag.tag + "_" + tag.text + "_tag_entry"}>{tag.tag}: &nbsp; <Text data={tag.text}/></li>
        ))}
      </ul>
    </div>
  );
};
