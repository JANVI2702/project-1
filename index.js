const express = require("express");

const port = 8081;

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded());

let infor = [];

app.get("/", (req, res) => {
  // console.log(students);
  return res.render("index", {
    infor,
  });
});

// insert data
app.post("/insertData", (req, res) => {
  let { id, task, editId } = req.body;
  if (editId) {
    let data = infor.map((val) => {
      if (val.id == editId) {
        val.task = task;
      }
      return val;
    });
    infor = data;
  } else {
    infor.push({ id, task });
  }
  return res.redirect("/");
});

// deletation
app.get("/deletData/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let data = infor.filter((info) => {
    return info.id != id;
  });
  infor = data;
  return res.redirect("/");
});

// edit the data
app.get("/editData/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let data = infor.filter((info) => {
    return info.id == id;
  });
  console.log(data[0]);

  return res.render("edit", {
    data: data[0],
  });
});
app.post("/clear_all_data", (req, res) => {
  infor = []; //clear all task
  res.redirect("/");
});

app.listen(port, (err) => {
  if (err) {
    console.log("Servar not start.");
    return false;
  }
  console.log("Server Start http://localhost:" + port);
});
