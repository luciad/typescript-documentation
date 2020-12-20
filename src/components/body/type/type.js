import React, { Component } from "react"
import SearchLink from "../general/search-link"
import Declaration from "./declaration"
import Target from "./target"
import Elements from "./elements"
import TargetType from "./target-type"
import ExtendsType from "./extends-type"
import CheckType from "./check-type"
import TrueType from "./true-type"
import FalseType from "./false-type"
import ElementType from "./element-type"
import Value from "./value"
// import Constraint from "./constraint"
import IndexType from "./index-type"
import ObjectType from "./object-type"
import QueryType from "./query-type"
import TypeArguments from "./type-arguments"

export default function Type({ data, delimiter, noIsOptionalMarker }) {
    if(!data || !data.type) return null
    let types = (data.type.types && data.type.types.length > 0) ? data.type.types : [data.type]
    if(!types || types.length === 0) return null
    types.type = data.type.type

    return (
        <div className="type">
            {!noIsOptionalMarker && data.flags && data.flags.isOptional &&
            <span title="optional">?</span>}
            <>{delimiter}</>
            {types.map((t, i) =>
                <span key={"key_" + t.type + t.name + t.id +  i + "_type_span"} className="type-item">
                {i > 0 && <span>&nbsp;{types.type === "union" ? "|" : types.type === "intersection" ? "&" : types.type}&nbsp;</span>}

                {(!t.elementType && !t.declaration && !t.name && !t.value && !t.target
                    && !t.elements && !t.checkType &&!t.extendsType &&!t.constraint
                    && !t.indexType && !t.ObjectType && !t.queryType) &&
                    <>{t.type}</>}

                {t.type === "inferred" &&
                    <>infer&nbsp;</> }

                <TypeElement data= {t}/>

                {/* <Constraint data={t}/> */}
                <CheckType data={t}/>
                <Declaration data={t}/>
                <ElementType data={t}/>
                <Elements data={t}/>
                <ExtendsType data={t}/>
                <ObjectType data={t}/>
                <QueryType data={t}/>
                <Target data={t}/>
                <TargetType data={t}/>
                <TypeArguments data={t}/>
                <Value data={t}/>
                <IndexType data={t}/>

                <TrueType data={t}/>
                <FalseType data={t}/>


                {t.kindString === "Type parameter" &&
                    <Type data={t} delimiter={<>&nbsp;extends&nbsp;</>}/>}
                </span>
            )}
        </div>
    )
}

class TypeElement extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.name) return null

        if(data.id)
            return (
                <SearchLink data={{text: data.name, id: data.id}}/>
            )
        return (
            <>{data.name}</>
        )
    }
}