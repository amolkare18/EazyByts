var express = require("express");
const dotenv = require("dotenv");
const connectdb=require('./db');
const nodemailer = require('nodemailer');
const cors = require("cors");
const admin_model = require('./models/admin');
const project_model=require('./models/project');
const skill_model=require("./models/skill");
const path=require('path');


dotenv.config();
connectdb();


const app = express();
// Middlewares
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname,'./frontend/build')));

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'./frontend/build/index.html'));
})

app.post('/login',async (req,res)=>{
  const {username,password}=req.body;
  
  await admin_model.findOne({username:username}).then(user =>{
    if(user){
      if(user.password===password){
        res.json("successful");
      }else{
        res.json("passowrd does not match");
      }
    }else{
      res.json("no record existed");
    }
  })
})
app.get('/projects',async (req,res)=>{
  try{
  
    const projects=await project_model.find();
   
    res.json(projects);
  } catch (err){
res.status(500).send(err);
  }


 })

 app.delete('/projects/:id', async (req, res) => {
  try {
    const deletedProject = await project_model.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).send('Project not found');
    }
    res.status(200).send('Project deleted');
  } catch (err) {
    res.status(500).send('Error deleting project');
  }
});

app.get('/skills',async (req,res)=>{
  try{
  
    const skills=await skill_model.find();
   
    res.json(skills);
  } catch (err){
res.status(500).send(err);
  }


 })


app.post('/projects', async (req, res) => {
  const { tittle, skills, img, link } = req.body;

  // Validate required fields
  if (!tittle || !img || !link) {
    return res.status(400).json({ message: "All required fields must be provided." });
  }

  try {
    const newProject = new project_model({
      tittle,
      skills: Array.isArray(skills) ? skills : [], // Ensure skills is an array
      img,
      link,
    });

    const savedProject = await newProject.save(); // Save the project to the database
    res.status(201).json(savedProject); // Respond with the saved project
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving project to the database." });
  }
});

app.post('/skills', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Skill name is required.' });
  }

  try {
    const newSkill = new skill_model({ name });
    const savedSkill = await newSkill.save(); // Save skill to the database
    res.status(201).json(savedSkill); // Respond with the saved skill
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding skill.' });
  }
});


app.delete('/skills/:id', async (req, res) => {
  try {
    const deletedSkill = await skill_model.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      return res.status(404).send('Skill not found');
    }
    res.status(200).send('Skill deleted');
  } catch (err) {
    console.error('Error deleting skill:', err);
    res.status(500).send('Error deleting skill');
  }
});


// app.post('/api/v1/portfolio/sendEmail', async (req, res) => {
//   const { name, email, msg } = req.body;

//   if (!name || !email || !msg) {
//     return res.status(400).json({ success: false, message: 'All fields are required.' });
//   }

//   try {
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port:587,
//       service: 'gmail',
//       secure:false,
//       auth: {
//         user:  process.env.USER, // Replace with your email
//         pass: process.env.APP_PASSWORD,       // Replace with your email password or app password
//       },
     
//     });

//     const mailOptions = {
//       from: email,
//       to: 'kareamol18@gmail.com', // Your email to receive messages
//       subject: `New message from ${name}`,
//       text: `Name: ${name}\nEmail: ${email}\nMessage: ${msg}`,
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true, message: 'Email sent successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Failed to send email.' });
//   }
// });
// Port
const PORT = process.env.PORT || 5000;

// Listen
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error occurred:", err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
