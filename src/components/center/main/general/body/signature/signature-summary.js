import React from "react"
import { getSignatures, getSignatureSummaries } from "../../../../../../util/util"

export default ({ data }) => {
    if(!data) return null
    const signatures = getSignatures(data)
    if(signatures.length === 0){
        return null;
    }
    const signatureSummaries = getSignatureSummaries(signatures)

  return (
    <div className="signaturesummary">
      <ul className="signaturesummarylist">
        {signatureSummaries.map(signatureSummary => (
          <li key={signatureSummary + "_signature_summary_entry"}>
            {signatureSummary}
          </li>
        ))}
      </ul>
    </div>
  );
};
