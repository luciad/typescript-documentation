import React, { Component } from "react";
import { getComments, getSignatures } from "../../util/util"
import BodySummary from "./body-summary"
import SearchLink from "./general/search-link"
import Text from "./general/text"
import Leaf from "../body/children/leaf"
import SymbolTitle from "../general/symbol-title"
import Type from "./type/type"
import SignatureSummaries from "./signature/signature-summaries"
import SignatureSummary from "./signature/signature-summary";

/**
 * Full body of an object
 * Contains:
 * - body summary (see body-summary.js)
 * - leaf of each child (see leaf.js)
 */
export default ({ data, shortListOnly, isLeaf }) => {
  if(!data) return null
  let path = data.fields ? data.fields.path : ""

  if(data.kindString === "Accessor") return <Accessor data={data} isLeaf={isLeaf} path={path}/>
  if((data.kindString === "Method" || data.kindString === "Function") && getSignatures(data).length === 1 && isLeaf ) return <SimpleMethod data={data}/>
  if(data.kindString === "Constructor" && getSignatures(data).length === 1  && isLeaf) return <SimpleConstructor data={data}/>

  return (
    <div className="body">
      <Header data={data} isLeaf={isLeaf}/>
      <BodySummary data={data} noChildrenSummary={shortListOnly}/>
      {shortListOnly
      ?   <ShortList data={data}/>
      : <Leaves data={data}/>}
    </div>
  );
};

/**
 * Title
 */
class Header extends Component {
  constructor(props){
    super(props)
    this.data = props.data
    this.isLeaf = props.isLeaf
  }

  render(){
    if(!this.data) return null

    if(this.isLeaf)
    return (
        <div className="body-head">
          <SymbolTitle data={this.data} link={true}/>
          <div className="bottom inline-block">
            <Type data={this.data} delimiter={" : "} noIsOptionalMarker={true}/>
          </div>
        </div>
    )

    return (
      <div className="body-header">
        <div>
          <SymbolTitle data={this.data}/>
          <div className="bottom inline-block">
            <Type data={this.data} delimiter={" : "} noIsOptionalMarker={true}/>
          </div>
        </div>
        <div className="sidecontainer">
          <div className="kind-string">
            {this.data.kindString}
          </div>
        </div>
        {getSignatures(this.data).length > 1 && <SignatureSummaries data={this.data}/>}
      </div>
    )
  }
}

/**
 * Leaf method with one signature
 */
class SimpleMethod extends Component {
  render(){
    const data = this.props.data

    return (
      <div className="simple-method body">
          <div className="simple-method-head sidecontainer">
            <SymbolTitle data={data} link={true}/>
            <span className="bottom">
              <SignatureSummary data={getSignatures(data)[0]}/>
            </span>
          </div>
              <BodySummary data={data} noChildrenSummary={true} simpleSignature={true}/>
      </div>
    )
  }
}

/**
 * Leaf constructor with one signature
 */
class SimpleConstructor extends Component {
  render(){
    const data = this.props.data
    const signature = getSignatures(data)[0]
    return (
      <div className="simple-constructor body">
          <div className="simple-constructor-head sidecontainer">
            <SymbolTitle data={data} link={true} text={signature.name}/>
            <span className="bottom">
              <SignatureSummary data={getSignatures(data)[0]}/>
            </span>
          </div>
              <BodySummary data={data} noChildrenSummary={true} simpleSignature={true}/>
      </div>
    )
  }
}

/**
 * Accessor (read/write)
 */
class Accessor extends Component {
  constructor(props){
    super(props)
    this.data = props.data
    this.isLeaf = props.isLeaf
    this.path = props.path
  }

  render(){
    const comments = this.data.getSignature ?  getComments(this.data.getSignature[0]) : getComments(this.data.setSignature[0])
    return (
    <div className="accessor body">
        <SymbolTitle data={this.data} link={this.isLeaf}/>
        {this.data.getSignature && <span> : <Type data={this.data.getSignature[0]}/></span>}

        {this.data.getSignature && this.data.setSignature && <div className="read_writeable">read-write</div>
        || this.data.getSignature && <div className="readable">read-only</div>}


        <Text data={comments.shortText} path={this.path}/>
        <Text data={comments.text} path={this.path}/>
    </div>
    )
  }
}

/**
 * Table with only links to children & their shortText
 */
class ShortList extends Component {
  render() {
    const data=this.props.data
    const children = data.children
    if(!children || children.length === 0 || !data.groups) return null

    return(
      <>
      <hr/>
      {data.groups.map(group => (
        <div className="table-group" key={"key_" + group.title + "_" + group.children.size + "_table-group"}>
          <br/>
          <div className="subtitle">{group.title}</div>
          <table>
            <tbody>
              {group.children.map(childID => {
                const child = children.find(child => (child.id == childID))
                return (
                  <tr key={"key_" + child.id + "_" + group.title + "_tr"}>
                    <td key={"key_" + child.id + "_" + group.title + "_td_link"}>
                      <SearchLink data={{text: child.name, id: child.id}}/>
                    </td>
                    <td key={"key_" + child.id + "_" + group.title + "_td_comment"}>
                      {child.comment &&
                        <Text data={child.comment.shortText}/>}
                    </td>
                  </tr>
                )})}
            </tbody>
          </table>
        </div>
      ))}
    </>
    )
  }
}

/**
 * Detailed representation of children
 */
class Leaves extends Component {
  render() {
    const data=this.props.data
    const children = data.children
    if(!children || children.length === 0 || !data.groups) return null

    return(
      <>
      <hr/>
      {data.groups.map(group => (
        <div className="leaf-group" key={"key_" + group.title + "_" + group.children.size + "_group"}>
          <div className="subtitle">{group.title}</div>
          {group.children.map(childID => {
                  const child = children.find(child => (child.id == childID))
                  return (
                    <Leaf data={child} key={"key_" + child.id + "_leaf"}/>
                  )
          })}
        </div>
      ))}
    </>
    )
  }
}
