import React, { Component } from "react"
import Type from "./type"

export default class Target extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.target) return null

        return (
            <>
                &nbsp;{data.operator}&nbsp;
                <Type data={{type: data.target}}/>
            </>
        )
    }
}