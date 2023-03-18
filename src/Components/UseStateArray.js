import React, { useState } from 'react'

const UseStateArray = () => {
    const biodata = [
        {
            id : 0, name:'hayat', age:23
        },
        {
            id : 1, name:'asif', age:33
        },
         {
            id : 2, name:'shawal', age:43
       }
    ];
    const [array,setArray] = useState(biodata);
    const clearArray=()=>{
        setArray([]);
    }
    //Removing todo list
    const removeElement=(id)=>{
     const mynewarray = array.filter((curentElement)=>{
       return curentElement.id!=id;
     })
     setArray(mynewarray);
    }
  return (
    <> {
        array.map((curentElement)=>
        
        {
        return(
        <h1>Name : {curentElement.name} Age : {curentElement.age} key:{curentElement.id}
        <button onClick={()=>removeElement(curentElement.id)}>Remove</button>
        </h1>
    )})}

    <button onClick={clearArray}>Clear Data</button>
    </>
  )
}

export default UseStateArray
