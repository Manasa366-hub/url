import React, { useState } from "react";
import axios from "axios";
import "./App.css";

import {
Container,
TextField,
Button,
Typography,
Paper,
Box,
CircularProgress,
LinearProgress,
Chip
} from "@mui/material";

import SecurityIcon from "@mui/icons-material/Security";
import WarningIcon from "@mui/icons-material/Warning";
import VerifiedIcon from "@mui/icons-material/Verified";

function App(){

const [url,setUrl]=useState("");
const [data,setData]=useState(null);
const [loading,setLoading]=useState(false);

const checkURL = async () => {

if(!url){
alert("Enter URL");
return;
}

setLoading(true);
setData(null);

try{

const res = await axios.post(
"http://127.0.0.1:5000/predict",
{url:url}
);

setData(res.data);

}catch{
setData({result:"Server Error",confidence:0,reasons:[]});
}

setLoading(false);

};

return(

<Box className="main-bg">

<Container maxWidth="sm">

<Paper className="glass-card">

<Box textAlign="center">

<SecurityIcon className="icon"/>

<Typography variant="h4" className="title">
AI Phishing Detector
</Typography>

<Typography className="subtitle">
Real-Time Cyber Threat Detection System
</Typography>

</Box>

<TextField
fullWidth
label="Enter Website URL"
margin="normal"
value={url}
onChange={(e)=>setUrl(e.target.value)}
className="input"
/>

<Button
variant="contained"
fullWidth
className="scan-btn"
onClick={checkURL}
>
Scan Website
</Button>

{/* Loading animation */}
{loading && (
<Box className="loading-box">
<CircularProgress/>
<Typography>Scanning for threats...</Typography>
</Box>
)}

{/* Result */}
{data && (

<Box className="result-box">

{/* Status */}
{data.result.includes("Safe") ? (
<Chip icon={<VerifiedIcon/>} label="SAFE" color="success"/>
):(
<Chip icon={<WarningIcon/>} label="PHISHING" color="error"/>
)}

<Typography variant="h6" className="result-text">
{data.result}
</Typography>

{/* Confidence */}
<Typography>Risk Confidence</Typography>

<LinearProgress
variant="determinate"
value={data.confidence}
className="progress"
/>

<Typography>{data.confidence}%</Typography>

{/* Reasons */}
{data.reasons.length > 0 && (
<Box className="reason-box">

<Typography>Threat Indicators:</Typography>

<ul>
{data.reasons.map((r,i)=>(
<li key={i}>{r}</li>
))}
</ul>

</Box>
)}

</Box>

)}

</Paper>

</Container>

</Box>

);

}

export default App;
