import React, { Component } from "react"
import SearchLink from "../../search-link"
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

export default function Type({ data, delimiter, noIsOptionalMarker }) {
    if(!data || !data.type) return null
    let types = (data.type.types && data.type.types.length > 0) ? data.type.types : [data.type]
    if(!types || types.length === 0) return null
    types.type = data.type.type
    console.log(delimiter)
    return (
        <div className="type">
            {!noIsOptionalMarker && data.flags && data.flags.isOptional &&
            <>? </>}
            <>{delimiter}</>
            {types.map((t, i) =>
                <>
                {i > 0 && <> {types.type === "union" ? " | " : types.type === "intersection" ? " & " : types.type} </>}

                {(!t.elementType && !t.declaration && !t.name && !t.value && !t.target
                    && !t.elements && !t.checkType &&!t.extendsType) &&
                    <>{t.type}</>}

                {t.type === "inferred" &&
                    <>infer&nbsp;</> }

                <ElementType data={t}/>
                <Declaration data={t}/>
                <TypeElement data= {t}/>
                <Value data={t}/>
                <Target data={t}/>
                <Elements data={t}/>
                <CheckType data={t}/>
                <ExtendsType data={t}/>
                <TrueType data={t}/>
                <FalseType data={t}/>

                {t.typeArguments &&
                    <>{"<"}
                        {t.typeArguments.map( (ta, i) =>
                            <>
                            {i > 0 && <>, </>}
                                <Type data={{type: ta}}/>
                            </>
                )}
                {">"}</>}
                {t.targetType &&
                <TargetType data={t}/>}
                {(t.kindString === "Type parameter" && t.type) &&
                <>
                    extends
                    <Type data={t}/>
                </>}
                </>
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