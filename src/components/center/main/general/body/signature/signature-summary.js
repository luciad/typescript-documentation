import React, { Component }  from "react"
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

function getSignatureSummaries(signatures){ //TODO: remove repetition
  return signatures.map(s => (
    <li key={s.name + "_" + s.id + "_signature_summary"}>
      <SignatureParameter data={s}/>
      {s.typeParameter &&
        <>{"<"}
        {s.typeParameter.map((tp, i) =>
          <div className="inline-block" title={tp.comment ? tp.comment.text : ""}>
            <SignatureParameter data={tp} i={i}/>
          </div>
          )}
          {">"}</>
      }
      (
        {s.parameters &&
          (<>
            {s.parameters.map((p, i) =>
              <SignatureParameter data={p} i={i}/>)}
          </>)}
        )
        <Type data={s} colon={true}/>
    </li>
  ))
}

class SignatureParameter extends Component {
  render() {
    let data = this.props.data
    let i = this.props.i
    return (
      <>
      {i > 0 && <>, </>}
      {data.flags && data.flags.isRest &&
      <>...</>}
      {data.name}
      <Type data={data} colon={true}/>
    </>
    )
  }
}