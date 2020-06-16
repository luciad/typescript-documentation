import React from "react"
import { getSignatures } from "../../../../../../util/util"
import Signature from "./signature"

/**
 * generates list of signatures
 *
 * Contains:
 * - List of signatures (see signature.js)
 */
export default ({ data, path}) => {
  if(!data || !path) return null
  const signatures = getSignatures(data)
  if(signatures.length === 0){
    return null;
  }
  return (
    <div className="signatures">
     {signatures.length !== 0 &&
        <div className="subsubtitle">Signatures</div>}
      <ul className="signaturelist">
        {signatures.map(signature => (
          <li>
            <Signature data={signature} path={path}/>
          </li>
        ))}
      </ul>
    </div>
  );
};
