import React, { Component } from "react"
import Type from "./type"

export default class FalseType extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.falseType) return null

        return (
            <>
                &nbsp;:&nbsp;
                <Type data={{type:data.falseType}}/>
            </>
        )
    }
}
