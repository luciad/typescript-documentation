import React from 'react'
import { Link } from "gatsby"
import Type from "../body/type/type"

export default ({ data, link }) => {
  return (
      <div className="symbol-title inline-block">
          <span className="title">
            {link ? <Link to={data.fields.path}>{data.name}</Link> : data.name}
            {data.typeParameter &&
                <>
                    {"<"}
                    {data.typeParameter.map((tp, i) =>
                    <>
                        {i > 0 && <>, </>}
                        <Type data={{type: tp}}/>
                    </>)}
                    {">"}
                </>}
        </span>
        {data.flags.isOptional &&
            <span className="bottom optional-mark inline-block" title="isOptional">&nbsp;?&nbsp;</span>}
    </div>
  )
}