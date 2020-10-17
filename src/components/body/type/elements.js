import React, { Component } from "react"
import Type from "./type"

export default class Elements extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.elements) return null
        return (
            <>
                {data.type === "tuple" ? "[" : "("}
                {data.elements && data.elements.map((e, i) =>
                <span key={"key_" + e.id + i + "_elements"}>
                    {i > 0 && <>, </>}
                    <Type data={{type: e}}/>
                </span>)}
                {data.type === "tuple" ? "]" : ")"}
            </>
        )
    }
}
