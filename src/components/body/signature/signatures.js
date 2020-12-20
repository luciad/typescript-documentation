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

  const eventOn = data.name === "on" && data.kindString === "Event" || data.kindString === "Method"

  return (
    <div className={eventOn ? "event-ons" : "signatures"}>
      <ul className={eventOn ? "event-on-list" : "signature-list"}>
        {signatures.map((signature, i) => (
            <li key={"key_" + signature.name + "_" + path + i + "_signature_entry"}>
              <span key={"key_" + signature.name + path + i + "_signature"}>
                {i > 0 && <hr/>}
                  <Signature data={signature} path={path}/>
              </span>
            </li>
        ))}
      </ul>
    </div>
  );
};
