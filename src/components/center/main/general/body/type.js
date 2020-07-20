import React, { Component } from "react"
import SearchLink from "../search-link"
import SignatureSummary from "./signature/signature-summary"

export default function Type({ data, colon, noIsOptionalMarker }) {
    if(!data || !data.type) return null
    let types = (data.type.types && data.type.types.length > 0) ? data.type.types : [data.type]
    if(!types || types.length === 0) return null
    types.type = data.type.type

    return (
        <div className="type">
            {!noIsOptionalMarker && data.flags && data.flags.isOptional &&
            <>? </>}
            {colon &&
            <> :&nbsp;</>}
            {types.map((t, i) =>
                <>
                {i > 0 && <> {types.type === "union" ? " | " : types.type} </>}
                {t.elementType
                ? (<>{t.type + "["}<Type data={{type: t.elementType}}/>]</>)
                : t.declaration
                        ? <Declaration data={t}/>
                        : t.name
                            ? <TypeElement data= {t}/>
                            : t.value
                                ? <>{"\"" + t.value + "\""}</>
                                : <>{t.type}</>}

                {t.typeArguments &&
                        t.typeArguments.map( (ta, i) =>
                            <>
                            {i > 0 && <>, </>}
                            <>{"<"}</>
                                <Type data={{type: ta}}/>
                            <>{">"}</>
                            </>
                )}
                </>
            )}
        </div>
    )
}

class TypeElement extends Component {
    render(){
        if(this.props.data.id)
            return (
                <SearchLink data={{text: this.props.data.name, id: this.props.data.id}}/>
            )
        return (
            <>{this.props.data.name}</>
        )
    }
}

class Declaration extends Component {
    render(){
        const data = this.props.data
        return(
            <div className="declaration inline-block">
                <div>{"{"}&nbsp;</div>
                <SignatureSummary data={data.declaration}/>
                {data.declaration.children &&
                    data.declaration.children.map((c, i) =>
                    <>
                    {i > 0 && <>, </>}
                    {c.name}
                    <Type data={c} colon={true}/>
                    </>)}

                {data.declaration.indexSignature &&
                    data.declaration.indexSignature.map((is, j) =>
                <>
                    {j > 0 && <>, </>}
                    {is.parameters.map((s, i) =>
                    <>
                        {i > 0 && <>, </>}
                        [{s.name}
                        <Type data={s} colon={true}/>]
                    </>)}
                    <Type data={is} colon={true}/>
                </>)}
                <div>&nbsp;{"}"}</div>
            </div>
        )
    }
}