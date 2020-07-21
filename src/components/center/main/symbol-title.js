import React from 'react'
import { Link } from "gatsby"

export default ({ data, link }) => {
  return (
      <>
        <div className="title">
            {link ? <Link to={data.fields.path}>{data.name}</Link> : data.name}
            {data.typeParameter &&
                <>
                    {"<"}
                    {data.typeParameter.map((tp, i) =>
                    <>
                        {i > 0 && <>, </>}
                        {tp.name}
                    </>)}
                    {">"}
                </>}
        </div>
        {data.flags.isOptional &&
            <div className="bottom optionalMark" title="isOptional">&nbsp;?&nbsp;</div>}
    </>
  )
}