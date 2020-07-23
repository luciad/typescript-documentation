import React, { Component } from "react"
import Type from "./type"

export default class ElementType extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.elementType) return null
        if(data.type !== "array") console.warn("unknown element-type: ", data.type)
        return (
            <>
                (<Type data={{type: data.elementType}}/>)[ ]
            </>
        )
    }
}