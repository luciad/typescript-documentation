import React, { Component }  from "react"
import { getSignatures } from "../../../../../../util/util"
import Type from "../type/type"

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
  return signatures.map(s => {
    let callBack = (s.name === "__call")
    return (
    <li key={s.name + "_" + s.id + "_signature_summary"} className="signaturesummary">
      {!callBack && s.name}
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
              <SignatureParameter data={p} i={i}/>
              )}
          </>)}
        )
        {callBack && <>&nbsp;{"=>"}&nbsp;</>}
        <Type data={s} colon={!callBack}/>
    </li>
  )})
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
      {!data.name.startsWith("__") && <>{data.name}</>}
      <Type data={data} colon={!data.name.startsWith("__")}/>
    </>
    )
  }
}