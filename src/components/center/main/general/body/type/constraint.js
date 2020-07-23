import React, { Component } from "react"
import Type from "./type"

export default class Constraint extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.constraint) return null

        return (
            <>
            _Constraint:_
            <Type data={{type: data.constraint}}/>
          </>
        )
    }
}