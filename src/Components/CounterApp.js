import React, { useEffect } from 'react';
import {Grid,Paper,Typography,Stack,Divider} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';


export default function CounterApp(){
     //useState hook in React
    const [count,setCount] = useState(0);
    const [color,setColor] = useState("white");
    const [myHeading,setmyHeading] = useState("CounterApp");

    //useEffect in react 
    useEffect(()=>{
       if(count<0){
        setCount(0);
       alert("Negative numbers are not allowed");
        }
    },[count]);


    const paperStyle = {
        height:'60vh',
        width : 780,
        marginTop : 50,
          }

          const buttonStyle = {
            backgroundColor : "blue",
          }

    return(<>
         <Grid align="center" mt="80">
            <Paper elevation={17}  style={paperStyle} sx={{backgroundColor : [color]}} > 
            <Typography variant='h4' mt='15'>{myHeading}</Typography>
            <Typography variant='h1' mt='10'>{count}</Typography>

            <Stack direction="row" justifyContent="center" spacing={4} mt={7} divider={<Divider orientation="vertical" flexItem/>} >

                <button style={buttonStyle} variant="outlined" onClick={()=>setCount(count-1)}>
                    <RemoveIcon/>
                </button>
                <button id='btn' style={buttonStyle} variant="outlined" onClick={()=>setCount(count+1)}>
                    <AddIcon/>
                </button>
                <button style={buttonStyle} variant="outlined" onClick={()=>setColor("yellow")}>
                    Yellow
                </button>
                <button style={buttonStyle} variant="outlined" onClick={()=>setColor("green")}>
                    Green
                </button>
                <button style={buttonStyle} variant="outlined" onClick={()=>setColor("purple")}>
                    Purple
                </button>

                <button style={buttonStyle} variant="outlined" onClick={()=>setmyHeading("Welcome")}>
                   Change Heading
                </button>

                </Stack>
            </Paper>  
         </Grid>
        </>
    )
}