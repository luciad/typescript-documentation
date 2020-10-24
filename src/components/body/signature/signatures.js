import React from "react"
import { getSignatures } from "../../../util/util"
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
  if(signatures.length === 0) return null

  return (
    <div className="signatures">
      <ul className="signature-list">
        {signatures.map((signature, i) => (
          <span key={"key_" + signature.name + path + i + "_signature"}>
            {i > 0 && <hr/>}
            <li key={"key_" + signature.name + "_" + path + "_signature_entry"}>
              <Signature data={signature} path={path}/>
            </li>
          </span>
        ))}
      </ul>
    </div>
  );
};