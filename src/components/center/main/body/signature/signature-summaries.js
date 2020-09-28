import React, { Component }  from "react"
import { getSignatures } from "../../../../../util/util"
import Type from "../type/type"
import SignatureSummary from "./signature-summary"

/**
 * renders all signatures from given data as it would appear in code
 * example output:
 *  myFunction(param1: number, param2:any):String
 */
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
  constructor(props){
    super(props)
    this.signatures = props.signatures
  }

  render(){

    return (
      <>
        {this.signatures.map( (signature, i) =>
          <>
            {i > 0 && <hr/>}
            <SignatureSummary data={signature}/>
        </>
      )}
    </>
    )}
}
