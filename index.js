const express = require('express')
const dotenv = require("dotenv");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
const morgan = require("morgan");
const createError = require("http-errors");
const pool = require('./db/db');
const { errorResponse } = require('./controllers/responseController');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// middleware
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json())

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

// post request
// create a new user
app.post("/api/register", async(req, res) => {
  try {
    const { full_name,username, password } = req.body;
    const id =uuidv4();
    const user = await pool.query("INSERT INTO users (id, full_name, username, password) VALUES($1, $2, $3, $4) RETURNING *", [id, full_name, username, password])  

    res.status(200).json({message: "User created successfully", payload:user.rows})
  } catch (error) {
   res.json({error: error.message})
  }

})

// get request for single and multiple user
app.get("/api/register", async(req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users",)  
    res.status(200).json({message: "Users return successfully", payload:users.rows})
  } catch (error) {
   res.json({error: error.message})
  }
})
app.get("/api/register/:id", async(req, res) => {
  try {
    const {id} = req.params
    const user = await pool.query("SELECT * FROM users WHERE id=$1", [id])  
    res.status(200).json({message: "User return successfully", payload:user.rows})
  } catch (error) {
   res.json({error: error.message})
  }
})

// delete request
app.delete("/api/register/:id", async(req, res) => {
  try {
    const {id} = req.params
    const user = await pool.query("DELETE FROM users WHERE id=$1", [id])  
    res.status(200).json({message: "User delete successfully", payload:user.rows})
  } catch (error) {
   res.json({error: error.message})
  }
})

// update request
app.put("/api/register/:id", async(req, res) => {
  try {
    const {id} = req.params;
    const { full_name,username, password } = req.body;
    const user = await pool.query("UPDATE users SET full_name =$1, username =$2, password =$3 WHERE id =$4 RETURNING *", [full_name, username, password, id]);  
    res.status(200).json({message: "User update successfully", payload:user.rows})
  } catch (error) {
   res.json({error: error.message})
  }
})

// express error handling middleware
// client error handling
app.use((req, res, next) => {
  next(createError(404, "Route Not Found"));
});


// server error handling -all the error coming here.
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})