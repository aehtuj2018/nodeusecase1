const { response } = require("express");
const express = require("express");
const { nextTick } = require("process");
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const students = [
  { id: 1, fname: "Amery Dudley", section: 1, Nationality: "Latvia" },
  { id: 2, fname: "Cooper Mcclure", section: 3, Nationality: "Kazakhstan" },
  {
    id: 3,
    fname: "Talon Riley",
    section: 3,
    Nationality: "Holy See (Vatican City State)",
  },
  { id: 4, fname: "Lyle Rivas", section: 3, Nationality: "Guinea-Bissau" },
  { id: 5, fname: "Jasper Bradley", section: 1, Nationality: "Belgium" },
  { id: 6, fname: "Barrett Dixon", section: 1, Nationality: "Samoa" },
  {
    id: 7,
    fname: "Slade Raymond",
    section: 2,
    Nationality: "United Kingdom (Great Britain)",
  },
  { id: 8, fname: "Colby May", section: 3, Nationality: "Korea, South" },
  { id: 9, fname: "Brody Flynn", section: 3, Nationality: "Mauritius" },
  { id: 10, fname: "Hasad Merritt", section: 3, Nationality: "Saint Martin" },
];


// print http request and method , need to complete 
app.use( function (req, res,next) {
    console.log(`Request URL:, ${req.originalUrl}`);
    next();
     
  });

  app.use(function (req, res,next) {
    console.log(`Time:, ${Date.now()}`)
    next();
  });

  app.use(function (req, res, next) {
    console.log(`Request Type:, ${req.method}`)
    next();
  })

// Retrive all student

app.get("/students/", (req, res) => {
  
    res.send(students);

});


//Add a Student

app.post("/students/add", function (req, res) {
  const student = {
    id: req.body.id,
    fname: req.body.fname,
    section: req.body.section,
    Nationality: req.body.Nationality,
  };
  students.push(student);
  res.status(200).send(student);
});

// Retrive a Studnet by ID

app.get("/students/retrive/id/:id", function (req, res) {


  var studentFound = students.find((students) => students.id == req.params.id);
  if (studentFound) res.json(studentFound);
  else res.sendStatus(404);
});

//Retrive a Student by Section

app.get("/students/retrive/section/:section", function (req, res) {
  var studentFound = students.find(
    (students) => students.section == req.params.section
  );
  if (studentFound) res.json(studentFound);
  else res.sendStatus(404);
});

//Update a Student by ID

app.put("/students/update/:id", (req, res) => {
  let student = students.filter(student => {
    return student.id == req.params.id;
  })[0];

  if (student) {

    const index = students.indexOf(student);
    const keys = Object.keys(req.body);
 
    

      keys.forEach((key) => {
        student[key] = req.body[key];
    });

    console.log(keys);
    console.log(student);

    students[index]= student;

    res.json(students[index]);
  }

  else res.sendStatus(404);
  
});


//delelte contact 

app.delete('/students/delete/:id',(req,res) => {

    const requestID=req.params.id;
    let student = students.filter(student => {
        return student.id == req.params.id;
      })[0];

      const index = students.indexOf(student);
      students.splice(index,1);
      
      res.json({message:`user ${requestID} deleted.`});

});
 


//console message: display server running
app.listen(3050, function () {
  console.log("server running on port 3050");
});
