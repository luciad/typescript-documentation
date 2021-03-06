import React from 'react'
import { Link } from "gatsby"
import Type from "../body/type/type"

export default ({ data, link, text }) => {
  return (
      <span className="symbol-title inline-block">
          <span className="title">
            {link ? <Link to={data.fields.path} title={data.kindString}>{text ? text : data.name}</Link> : data.name}
            {data.typeParameter &&
                <>
                    {"<"}
                    {data.typeParameter.map((tp, i) =>
                    <span key={"key_" + tp.id + i + "type_parameter_symbol_title"}>
                        {i > 0 && <>, </>}
                        <Type data={{type: tp}}/>
                    </span>)}
                    {">"}
                </>}
        </span>
        {data.flags && data.flags.isOptional &&
            <span className="bottom optional-mark inline-block" title="isOptional">&nbsp;?&nbsp;</span>}
    </span>
  )
}