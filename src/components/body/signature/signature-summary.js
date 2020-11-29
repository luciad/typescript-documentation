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
    if(!this.data) return null
    let callBack = (this.data.name === "__call")

    return (
      <span key={"key_" + this.data.name + "_" + this.data.id + "_signature_summary"} className="signature-summary-item">
        {!callBack &&
          <span className="signature-title">{this.data.name.replace("__", "")}</span>}
        {this.data.typeParameter &&
          <>{"<"}
          {this.data.typeParameter.map((tp, i) =>
            <span key={"key_" + tp.id + "_" + i + "_tp_map"}>
            {i > 0 && <>, </>}
            {tp.name}
            <Type data={tp} delimiter={<>&nbsp;extends </>}/>
            </span>
            )}
            {">"}</>
        }
        ({this.data.parameters &&
            this.data.parameters.map((p, i) =>
              <SignatureParameter data={p} i={i} key={"key_" + p.id + "_" + i + "_sign_param"}/>)
          })
          {callBack && <>&nbsp;{"=>"}&nbsp;</>}
          <Type data={this.data} delimiter={!callBack ? " : " : null}/>
      </span>
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