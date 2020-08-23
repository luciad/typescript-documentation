import React, { Component }  from "react"
import { getSignatures } from "../../../../../../util/util"
import Type from "../type/type"

export default ({ data }) => {
  if(!data) return null
  const signatures = getSignatures(data)
  if(signatures.length === 0) return null

  return (
    <div className="signature-summary">
      <ul>
        <SignatureSummaries signatures={signatures}/>
      </ul>
    </div>
  )
}

class SignatureSummaries extends Component {
  render(){
    let signatures = this.props.signatures

    return signatures.map((s, j) => {
      let callBack = (s.name === "__call")

      return (
        <div className="signature-summary-item">
        {j > 0 && <hr/>}
        <li key={s.name + "_" + s.id + "_signature_summary"}>
          {!callBack && s.name}
          {s.typeParameter &&
            <>{"<"}
            {s.typeParameter.map((tp, i) =>
              <>
              {i > 0 && <>, </>}
              {tp.name}
              <Type data={tp} delimiter={<>&nbsp;extends </>}/>
              </>
              )}
              {">"}</>
          }
          ({s.parameters &&
              s.parameters.map((p, i) =>
                <SignatureParameter data={p} i={i}/>)
            })
            {callBack && <>&nbsp;{"=>"}&nbsp;</>}
            <Type data={s} delimiter={!callBack ? " : " : null}/>
        </li>
      </div>
    )})
  }
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
      <Type data={data} delimiter={!data.name.startsWith("__") ? " : " : null}/>
      {data.defaultValue &&
        <> = {data.defaultValue}</>}
    </>
    )
  }
}