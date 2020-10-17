import React, { Component } from "react"
import SignatureSummary from "../signature/signature-summaries"
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
                    <span key={c.ame + i + "_declaration_child"}>
                    {i > 0 && <>, </>}
                    {c.name}
                    <Type data={c} delimiter={" : "}/>
                    </span>)}

                {data.declaration.indexSignature &&
                    data.declaration.indexSignature.map((is, j) =>
                <span key={j + "_index_signatures"}>
                    {j > 0 && <>, </>}
                    {is.parameters.map((s, i) =>
                    <span key = {s.id + i + "_index_signature"}>
                        {i > 0 && <>, </>}
                        [{s.name}
                        <Type data={s} delimiter={" : "}/>]
                    </span>)}
                    <Type data={is} delimiter={" : "}/>
                </span>)}
                <div>&nbsp;{"}"}</div>
            </div>
        )
    }
}