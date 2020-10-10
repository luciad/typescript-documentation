import React, { Component }  from "react"
import Type from "../type/type"

/**
 * Renders single signature summary
 *  example output:
 *  myFunction(param1: number, param2:any):String
 */
class SignatureSummary extends Component {
  constructor(props){
    super(props)
    this.data = props.data
  }

  render(){
    let callBack = (this.data.name === "__call")

    return (
      <div className="signature-summary-item">
      <li key={this.data.name + "_" + this.data.id + "_signature_summary"}>
        {!callBack &&
          <span className="signature-title">{this.data.name}</span>}
        {this.data.typeParameter &&
          <>{"<"}
          {this.data.typeParameter.map((tp, i) =>
            <>
            {i > 0 && <>, </>}
            {tp.name}
            <Type data={tp} delimiter={<>&nbsp;extends </>}/>
            </>
            )}
            {">"}</>
        }
        ({this.data.parameters &&
            this.data.parameters.map((p, i) =>
              <SignatureParameter data={p} i={i}/>)
          })
          {callBack && <>&nbsp;{"=>"}&nbsp;</>}
          <Type data={this.data} delimiter={!callBack ? " : " : null}/>
      </li>
    </div>
  )}
}

export default SignatureSummary

class SignatureParameter extends Component {
  render() {
    let data = this.props.data
    let i = this.props.i

    return (
      <>
      {i > 0 && <>, </>}
      {data.flags && data.flags.isRest &&
      <>...</>}
      {!data.name.startsWith("__") && <span className="signature-title">{data.name}</span>}
      <Type data={data} delimiter={!data.name.startsWith("__") ? " : " : null}/>
      {data.defaultValue &&
        <> = {data.defaultValue}</>}
    </>
    )
  }
}