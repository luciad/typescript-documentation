import React, { Component } from "react"

export default class Value extends Component {
    render(){
        const data=this.props.data
        if(!data || !data.value) return null

        return (
            <span className="value">{"\"" + data.value + "\""}</span>
        )
    }
}