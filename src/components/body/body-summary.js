import React, { Component } from "react";
import { getComments } from "../../util/util"
import ChildrenSummary from "./children/children-summary"
import Flags from "./flags"
import Signatures from "./signature/signatures"
import References from "./references"
import Text from "./general/text"
import Tags from "./tags"
import Overwrites from "./overwrites"
import TypeParameters from './parameters/type-parameters'
import TypeComments from "./type-comments"
import SearchLink from "./general/search-link";
import Type from "./type/type"
import SymbolTitle from "../general/symbol-title"
import SignatureSummaries from "./signature/signature-summaries"

/**
 * Summary of an object
 * Contains:
 * - returns
 * - default value
 * - extended by, implemented by etc (see links.js)
 *
 * - shortText
 * - text
 * - tags
 * - signatures (see signatures.js)
 * - flags (see flags.js)
 * - summary of its children (see children-summary.js)
 *
 */
export default ({ data, isLeaf,  noChildrenSummary}) => {
  if(!data) return null
  const comments = getComments(data)
  let path = data.fields ? data.fields.path : ""

  if(data.kindString === "Accessor") return <Accessor data={data} isLeaf={isLeaf} path={path}/>
  return (
    <div className="body-summary">
      <Header data={data} isLeaf={isLeaf}/>

      {comments.returns.length > 0 &&
        <div className="sidecontainer returns">returns&nbsp;<Text data={comments.returns} path={path}/></div>}
      {data.overwrites &&
        <div className="overwrites">
          <div className="subsubtitle">Overwrites</div>
          <ul><li><Overwrites data={data}/></li></ul>
        </div>}
      <Flags data={data}/>
      <References data={data}/>

        {data.target &&
          <div className="target">
            Target: <SearchLink data={{text: "", id: data.target}}/>
          </div>}
      {!(comments.shortText.length === 0 && comments.text.length === 0 && comments.tags.length === 0) &&
        <><hr/><div className="subtitle">About</div></>}
      {!data.getSignature && !data.setSignature && (!data.signatures || data.signatures.length === 0) &&
      <>
        <Text data={comments.shortText} path={path}/>
        <Text data={comments.text} path={path}/>
      </>}

      <TypeParameters data={data} path={path}/>
      <TypeComments data={data} path={path}/>
      <Tags tags={comments.tags}/>
      <Signatures data={data} path={path}/>
      {!noChildrenSummary &&
        <ChildrenSummary data={data}/>}
    </div>
  )
}

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
        <div>
          <SymbolTitle data={this.data} link={true}/>
          <div className="bottom inline-block">
            <Type data={this.data} delimiter={" : "} noIsOptionalMarker={true}/>
          </div>
        </div>
    )

    return (
      <div>
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
        <SignatureSummaries data={this.data}/>
      </div>
    )
  }
}

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
    <div className="accessor body-summary">
        <SymbolTitle data={this.data} link={this.isLeaf}/>
        {this.data.getSignature && <span> : <Type data={this.data.getSignature[0]}/></span>}

        <ul>
          {this.data.getSignature && <li>gettable</li>}
          {this.data.setSignature && <li>settable</li>}
        </ul>

        <Text data={comments.shortText} path={this.path}/>
        <Text data={comments.text} path={this.path}/>
    </div>
    )
  }
}