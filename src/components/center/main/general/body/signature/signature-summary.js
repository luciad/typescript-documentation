import React from "react"
import { getSignatures } from "../../../../../../util/util"
import Type from "../type"

export default ({ data }) => {
    if(!data) return null
    const signatures = getSignatures(data)
    if(signatures.length === 0) return null
  return (
    <div className="signaturesummary">
      <ul className="signaturesummarylist">
       {getSignatureSummaries(signatures)}
      </ul>
    </div>
  );
};

function getSignatureSummaries(signatures){
  return signatures.map(s => (
    <li key={s.name + "_" + s.id + "_signature_summary"}>
      {s.name}
      {s.typeParameter &&
        <>{"<"}
        {s.typeParameter.map((tp, i) =>
          <div style={{display: "inline-block"}} title={tp.comment ? tp.comment.text : ""}>
            {i > 0 && <>, </>}
            {tp.name}
          </div>
          )}
          {">"}</>
      }
      (
        {s.parameters &&
          (<>
            {s.parameters.map((p, i) => (
              <>
                {i > 0 && <>, </>}
                {p.name}
                <Type data={p} colon={true}/>
              </>))}
          </>)}
        )
        <Type data={s} colon={true}/>
    </li>
  ))
}