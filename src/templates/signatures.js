import React from "react"
import { getSignatures } from "../util/util"
import Signature from "./signature"

export default ({ data }) => {
  const signatures = getSignatures(data)
  
  return (
    <div>
     {signatures.length !== 0 && 
        <div className="subsubtitle">Signatures</div>}
      <ul>
        {signatures.map(signature => (
          <li>
            <Signature data={signature}/>
          </li>
        ))}
      </ul>
    </div>
  );
};
