import React from "react"
import { getFlags } from "../util/util"

export default ({ data }) => {
  const flagList = getFlags(data)
  
  return (
    <div>
      {flagList.length !== 0 && 
        <div className="subsubtitle">Flags</div>}
      <ul>
        {flagList.map(flag => (
          <li>
            {flag}
          </li>
        ))}
      </ul>
    </div>
  );
};
