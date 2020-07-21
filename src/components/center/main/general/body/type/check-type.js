import React, { Component } from "react"
import Type from "./type"

export default class CheckType extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.checkType) return null

        return (
            <Type data={{type: data.checkType}}/>
        )
    }
}