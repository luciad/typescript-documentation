import React, { Component } from "react"
import Type from "./type"

export default class TrueType extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.trueType) return null

        return (
            <>
                &nbsp;?&nbsp;
                <Type data={{type:data.trueType}}/>
            </>
        )
    }
}