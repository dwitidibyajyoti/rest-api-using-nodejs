const e = require('express');
const express = require('express');
require('./db/conn');
const app = express();
const Student = require('./models/student');
const port = process.env.PORT || 3000;
app.use(express.json());
// app.post('/students', (req, res) => {
//   const user = new Student(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((e) => {
//       res.status(400).send(e);
//     });

//   //res.send('hellow from other side');
// });
// red data from data base
app.get('/students', async (req, res) => {
  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (e) {
    res.send(e);
  }
});
app.get('/students/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const studentsData = await Student.findOne({name});
    if (!studentsData) {
      return res.status(404).send('student is not valid');
    } else {
      res.status(201).send(studentsData);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});
// add data in data base
app.post('/students', async (req, res) => {
  const user = new Student(req.body);

  try {
    const createuser = await user.save();
    res.status(201).send(createuser);
  } catch (e) {
    res.status(400).send(e);
  }
});

/// update the students by id

app.patch('/students/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(201).send(updateStudent);
  } catch (e) {
    res.status(404).send(e);
  }
});

// delete students data

app.delete('/students/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteData = await Student.findByIdAndDelete(_id);
    if (!req.params.id) {
      res.status(400).send('invalid students');
    } else {
      res.status(201).send(deleteData);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`sarver is running in ${port}`);
});
