import React, { Component } from "react"
import SearchLink from "../search-link"

export default ({ data, colon }) => {
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
                    : <>{t.type}</>}
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