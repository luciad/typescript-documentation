import React, { Component } from "react"
import Type from "./type"

export default class ElementType extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.elementType) return null

        return (
            <>
                {data.type}
                [<Type data={{type: data.elementType}}/>]
            </>
        )
    }
}