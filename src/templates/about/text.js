import React from "react";
import About from "./body"
import Icon from "../icon"
import { getLinks } from "../../util/util"


export default ({ data }) => {
  const parsedData = getLinks(data)
  return (
    <div>
      {parsedData.map(data => (
              <>{data.text}</>
            ))}
    </div>
  );
};
