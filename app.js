// import express framework
const express=require('express');
const cors = require("cors");


//create express app
const app=express();
app.use(cors());
// allow serer to accept json data 
app.use(express.json());
// temporary student data create 
//you  can edit,delete  this array 
let students=[
    {id:1,name:"Priya ",course:"Java"},
    {id:2,name:"Sanjay ",course:"python"}
];
//Get method to fetch all students
app.get('/students',(req,res)=>{ // /students that path(endpoint) url
    // URL: http://localhost:3001/students
    res.json(students); // send array as json  
});

//post method to add new data
//ex add id:3,name:"dhanu",course:"c++"
app.post("/students",(req,res)=>{
    const newstudent=req.body; //request.body use for comes data from frontend
    students.push(newstudent);// add new student to array
    res.json({message: "stduent added",data:newstudent}); // send added student as json 
});

//put method to update existing student data
// update entire student record by id 
app.put("/students/:id",(req,res)=>{ //  :id is dynamic parameter that like /stduent/1
    const id=parseInt(req.params.id);
    //req.params.id  get values form url 
    //parseInt covert string to int 
    //param means route parameter 
    const updatedData=req.body;
    //req.boody get updated data from front end

        //find index of student by id
    let stduentIndex=students.findIndex(s=>s.id==id);
    if(stduentIndex==-1){
        return res.status(404).json({message :"stduent not fonud "});
        // if student not fount send error 404 
        //return stops the fuction here 
    }
    students[stduentIndex]=updatedData;
    //update student data 
    res.json({message:"student update",data:updatedData});

})


// delete method to remove stduent by id 
app.delete("/students/:id",(req,res)=>{
    const id=parseInt(req.params.id);
students=students.filter(s=>s.id !==id);
//.filter() creates a new array
//It keeps only the students whose id is NOT equal to the given id

res.json({message:"studnet deleted", remaining :students});
});
app.listen(3301, () => {
    console.log("Backend server running on port 3301");
});

