import React, { Component } from "react"
import SearchLink from "../search-link"
import SignatureSummary from "./signature/signature-summary"

export default function Type({ data, colon }) {
    if(!data || !data.type) return null
    let types = (data.type.types && data.type.types.length > 0) ? data.type.types : [data.type]
    if(!types || types.length === 0) return null
    types.type = data.type.type

    return (
        <div className="type">
            {colon &&
            <>&nbsp;:&nbsp;</>}
            {types.map((t, i) =>
                <>
                {i > 0 && <> {types.type === "union" ? " | " : types.type} </>}
                {t.elementType
                ? (<>{t.type + "["}<TypeElement data={t.elementType}/>]</>)
                : t.name
                    ? <TypeElement data= {t}/>
                    : t.declaration
                        ? <div style={{display:"inline-block"}}><SignatureSummary data={t.declaration}/></div>
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