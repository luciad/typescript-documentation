import React from "react"
import { getSignatures } from "../../util/util"
import Signature from "./signature"

/**
 * generates list of signatures
 */
export default ({ data }) => {
  const signatures = getSignatures(data)
  
  return (
    <div>
     {signatures.length !== 0 && 
        <div className="subsubtitle">Signatures</div>}
      <ul className="signaturelist">
        {signatures.map(signature => (
          <li>
            <Signature data={signature}/>
          </li>
        ))}
      </ul>
    </div>
  );
};
