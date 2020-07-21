import React, { Component } from "react"
import Type from "./type"

export default class TargetType extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.targetType) return null

        return (
            <>
            &nbsp;is&nbsp;
             <Type data={{type: data.targetType}}/>
            </>
        )
    }
}