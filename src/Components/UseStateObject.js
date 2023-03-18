import React, { useState } from 'react'

const UseStateObject = () => {
    const [myObject,setmyObject] = useState({
        myName : "hayat" , myAge:23 , myDegree:"SE"
    });
// use spread operator(...) to update specific value in object
    const changeMyObject=()=>{
        setmyObject({...myObject,myName:"Hayat khan"})
    }
  return (
    <>
      <h1>Name : {myObject.myName} & MyAge : {myObject.myAge} & MyDegree:{myObject.myDegree}</h1>
      <button onClick={changeMyObject}>Update</button>
    </>
  )
}

export default UseStateObject
