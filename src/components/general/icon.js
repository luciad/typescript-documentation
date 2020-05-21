import React from "react";

/**
 * returns div containing icon of given kindString or (kindString) if there is no icon specified
 */
export default ({ kindString }) => {

  let imgSrc = ""
  switch(kindString){
    case "Class":{
      imgSrc = "https://image.flaticon.com/icons/svg/2638/2638424.svg"
      break
    }
    case "Interface":{
      imgSrc = "https://image.flaticon.com/icons/svg/2497/2497519.svg"
      break
    }
    case "Method":{
      imgSrc = "https://image.flaticon.com/icons/svg/2519/2519358.svg"
      break
    }
    case "Accessor":{
      imgSrc = "https://image.flaticon.com/icons/svg/2497/2497513.svg"
      break
    }
    case "Constructor":{
      imgSrc = "https://image.flaticon.com/icons/svg/2766/2766844.svg"
      break
    }
    case "External module":{
      imgSrc = "https://image.flaticon.com/icons/svg/2497/2497497.svg"
      break
    }
    case "Property":{
      imgSrc = "https://image.flaticon.com/icons/svg/2497/2497459.svg" 
      break
    }
    case "Function":{
      imgSrc = "https://image.flaticon.com/icons/svg/2638/2638364.svg"
      break
    }
    case "Enumeration":{
      imgSrc = "https://image.flaticon.com/icons/svg/2638/2638457.svg" 
      break
    }
    case "Enumeration member":{
      imgSrc = "https://image.flaticon.com/icons/svg/2638/2638433.svg"
      break
    }
    case "Event":{
      imgSrc = "https://image.flaticon.com/icons/svg/2638/2638283.svg"
      break
    }
    case "Flag":{
      imgSrc = "https://image.flaticon.com/icons/svg/2638/2638352.svg"
      break
    }
    
    default:
    return (
      <div className="icon">
        ({kindString}) &nbsp;  
      </div>
    );
  }
  return (
    <div className="icon">
      <img src={imgSrc} title={kindString} alt=""/>
      </div>
  )
};
