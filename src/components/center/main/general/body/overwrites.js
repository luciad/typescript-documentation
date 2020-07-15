import React from "react"
import SearchLink from "../search-link"

export default ({ data }) => {
    if(!data || !data.overwrites) return null
    
    if(data.overwrites.id)
        return (
            <SearchLink data={{text: data.overwrites.name, id: data.overwrites.id}}/>
        )
    return (
        <>{data.overwrites.name}</>
    )
}