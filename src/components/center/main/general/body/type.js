import React, { Component } from "react"
import SearchLink from "../search-link"
import SignatureSummary from "./signature/signature-summary"

export default function Type({ data, colon, noIsOptionalMarker }) {
    if(!data || !data.type) return null
    let types = (data.type.types && data.type.types.length > 0) ? data.type.types : [data.type]
    if(!types || types.length === 0) return null
    types.type = data.type.type

    return (
        <div className="type">
            {!noIsOptionalMarker && data.flags && data.flags.isOptional &&
            <>? </>}
            {colon &&
            <> :&nbsp;</>}
            {types.map((t, i) =>
                <>
                {i > 0 && <> {types.type === "union" ? " | " : types.type} </>}

                {(!t.elementType && !t.declaration && !t.name && !t.value && !t.target
                    && !t.elements && !t.checkType &&!t.extendsType) &&
                    <>{t.type}</>}

                {t.type === "inferred" ? <>infer&nbsp;</> : ""}

                {t.elementType &&
                    <>{t.type + "["}<Type data={{type: t.elementType}}/>]</>}
                {t.declaration &&
                    <Declaration data={t}/>}
                {t.name &&
                    <TypeElement data= {t}/>}
                {t.value &&
                    <>{"\"" + t.value + "\""}</>}
                {t.target &&
                    <Target data={t}/>}
                {t.elements &&
                    <Elements data={t}/>}
                {t.checkType &&
                    <CheckType data={t}/>}
                {t.extendsType &&
                    <ExtendsType data={t}/>}
                {t.trueType &&
                    <TrueType data={t}/>}
                {t.falseType &&
                    <FalseType data={t}/>}

                {t.typeArguments &&
                        t.typeArguments.map( (ta, i) =>
                            <>
                            {i > 0 && <>, </>}
                            <>{"<"}</>
                                <Type data={{type: ta}}/>
                            <>{">"}</>
                            </>
                )}
                {t.targetType &&
                <TargetType data={t}/>}
                </>
            )}
        </div>
    )
}

class FalseType extends Component {
    render(){
        const data = this.props.data
        return (
            <>
                &nbsp;:&nbsp;
                <Type data={{type:data.falseType}}/>
            </>
        )
    }
}

class TrueType extends Component {
    render(){
        const data = this.props.data
        return (
            <>
                &nbsp;?&nbsp;
                <Type data={{type:data.trueType}}/>
            </>
        )
    }
}

class ExtendsType extends Component {
    render(){
        const data = this.props.data
        return (
            <>
                &nbsp;extends&nbsp;
                <Type data={{type: data.extendsType}}/>
            </>
        )
    }
}
class CheckType extends Component {
    render(){
        const data = this.props.data
        return (
            <Type data={{type: data.checkType}}/>
        )
    }
}

class TargetType extends Component {
    render(){
        const data = this.props.data
        if(!data.targetType) return null
        return (
            <>
            &nbsp;is&nbsp;
             <Type data={{type: data.targetType}}/>
            </>
        )
    }
}

class Elements extends Component {
    render(){
        const data = this.props.data
        if(!data || !data.elements) return null
        return (
            <>
                {data.type === "tuple" ? "[" : "("}
                {data.elements && data.elements.map((e, i) =>
                <>
                    {i > 0 && <>, </>}
                    <Type data={{type: e}}/>
                </>)}
                {data.type === "tuple" ? "]" : ")"}
            </>
        )
    }
}
class Target extends Component {
    render(){
        const data = this.props.data
        return (
            <>
                &nbsp;{data.operator}&nbsp;
                <Type data={{type: data.target}}/>
            </>
        )
    }
}
class TypeElement extends Component {
    render(){
        if(this.props.data.id)
            return (
                <SearchLink data={{text: this.props.data.name, id: this.props.data.id}}/>
            )
        return (
            <>{this.props.data.name}</>
        )
    }
}

class Declaration extends Component {
    render(){
        const data = this.props.data
        return(
            <div className="declaration inline-block">
                <div>{"{"}&nbsp;</div>
                <SignatureSummary data={data.declaration}/>
                {data.declaration.children &&
                    data.declaration.children.map((c, i) =>
                    <>
                    {i > 0 && <>, </>}
                    {c.name}
                    <Type data={c} colon={true}/>
                    </>)}

                {data.declaration.indexSignature &&
                    data.declaration.indexSignature.map((is, j) =>
                <>
                    {j > 0 && <>, </>}
                    {is.parameters.map((s, i) =>
                    <>
                        {i > 0 && <>, </>}
                        [{s.name}
                        <Type data={s} colon={true}/>]
                    </>)}
                    <Type data={is} colon={true}/>
                </>)}
                <div>&nbsp;{"}"}</div>
            </div>
        )
    }
}