import React from "react";

export default ({ kindString }) => {
  
  switch(kindString){
    case "Class":{
      return (
        <div className="icon">
          <img src="https://image.flaticon.com/icons/svg/1089/1089129.svg"/>
          </div>
      )
    }
    case "Interface":{
      return (
        <div className="icon">
          <img src="https://image.flaticon.com/icons/svg/2497/2497519.svg"/>
          </div>
      )
    }
    case "Method":{
      return (
        <div className="icon">
          <img src="https://image.flaticon.com/icons/svg/2519/2519358.svg"/>
          </div>
      )
    }
    case "Accessor":{
      return (
        <div className="icon">
          <img src="https://image.flaticon.com/icons/svg/2497/2497513.svg"/>
          </div>
      )
    }
    case "Constructor":{
      return (
        <div className="icon">
          <img src="https://image.flaticon.com/icons/svg/2766/2766844.svg"/>
          </div>
      )
    }



    
    

    default:
    return (
      <div className="icon">
        ({kindString}) &nbsp;  
      </div>
    );
  }
};
