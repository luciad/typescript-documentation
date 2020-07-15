import React from "react"

export default ({ data }) => {
    if(!data || !data.type) return null
    let types = []
    if(data.type.types && data.type.types.length > 0){
        types = data.type.types
    }else{
        types = [data.type]
    }
    if(!types || types.length === 0) return null
    types.type = data.type.type
    const typeString = types.map(t =>
        t.elementType
            ? t.type + "[" + t.elementType.name + "]"
            : t.name ? t.name : t.type
            ).join(" " + types.type + " ")

    return (
        <div className="type">
            {typeString}
        </div>
    )
}