import React from 'react'
import { Link } from "gatsby"
import Type from "./general/body/type/type"

export default ({ data, link }) => {
  return (
      <div className="symbol-title inline-block">
        <div className="title">
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
        </div>
        {data.flags.isOptional &&
            <div className="bottom optional-mark" title="isOptional">&nbsp;?&nbsp;</div>}
    </div>
  )
}