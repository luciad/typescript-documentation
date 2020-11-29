import React, { Component } from "react"
import SignatureSummary from "../signature/signature-summary"
import Type from "./type"
import { getSignatures } from "../../../util/util"

export default class Declaration extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.declaration) return null

        return(
            <span className="declaration">
                <span>{"{"}&nbsp;</span>
                <SignatureSummary data={getSignatures(data.declaration)[0]}/>
                {data.declaration.children &&
                    data.declaration.children.map((c, i) =>
                    <span key={"key_" + c.ame + i + "_declaration_child"}>
                    {i > 0 && <>, </>}
                    {c.name}
                    <Type data={c} delimiter={" : "}/>
                    </span>)}

                {data.declaration.indexSignature &&
                    data.declaration.indexSignature.map((is, j) =>
                <span key={"key_" + j + "_index_signatures"}>
                    {j > 0 && <>, </>}
                    {is.parameters.map((s, i) =>
                    <span key = {s.id + i + "_index_signature"}>
                        {i > 0 && <>, </>}
                        [{s.name}
                        <Type data={s} delimiter={" : "}/>]
                    </span>)}
                    <Type data={is} delimiter={" : "}/>
                </span>)}
                <span>&nbsp;{"}"}</span>
            </span>
        )
    }
}