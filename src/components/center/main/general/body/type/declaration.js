import React, { Component } from "react"
import SignatureSummary from "../signature/signature-summary"
import Type from "./type"

export default class Declaration extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.declaration) return null

        return(
            <div className="declaration inline-block">
                <div>{"{"}&nbsp;</div>
                <SignatureSummary data={data.declaration}/>
                {data.declaration.children &&
                    data.declaration.children.map((c, i) =>
                    <>
                    {i > 0 && <>, </>}
                    {c.name}
                    <Type data={c} delimiter={" : "}/>
                    </>)}

                {data.declaration.indexSignature &&
                    data.declaration.indexSignature.map((is, j) =>
                <>
                    {j > 0 && <>, </>}
                    {is.parameters.map((s, i) =>
                    <>
                        {i > 0 && <>, </>}
                        [{s.name}
                        <Type data={s} delimiter={" : "}/>]
                    </>)}
                    <Type data={is} delimiter={" : "}/>
                </>)}
                <div>&nbsp;{"}"}</div>
            </div>
        )
    }
}