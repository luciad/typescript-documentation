import React, { Component } from "react"
import Type from "./type"

/**
 * Can be hidden as it seems like double info most of the time
 */
export default class Constraint extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.constraint) return null
        return (
            <>
            &nbsp;extends&nbsp;
            <Type data={{type: data.constraint}}/>
          </>
        )
    }
}