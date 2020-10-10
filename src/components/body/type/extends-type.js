import React, { Component } from "react"
import Type from "./type"

export default class ExtendsType extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.extendsType) return null

        return (
            <>
                &nbsp;extends&nbsp;
                <Type data={{type: data.extendsType}}/>
            </>
        )
    }
}