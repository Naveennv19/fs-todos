// const inputBox = document.getElementById("input-box");
// const list = document.getElementById("lists");

// function addTodo(){
//     if(inputBox.value === ''){
//         alert("Add your todo");
//     } else {
//         let li = document.createElement("li");
//         li.innerHTML = inputBox.value;
//         list.appendChild(li);
//         let span = document.createElement("span");
//         span.innerHTML = "\u00d7";
//         li.appendChild(span);
//     }
//     inputBox.value = '';
// }

// list.addEventListener("click", function(e){
//     if(e.target.tagName === "LI"){
//         e.target.classList.toggle("checked");
//     } else if (e.target.tagName === "SPAN") {
//         e.target.parentElement.remove();
//     }
// }, false);

const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (your HTML) from the current directory
app.use(express.static(__dirname));

// Endpoint to receive the todo and write it to a.txt
app.post('/addTodo', (req, res) => {
    const todo = req.body.todo + '\n'; // Get the todo from the request body and add a newline

    // Append the todo to a.txt
    fs.appendFile('a.txt', todo, (err) => {
        if (err) {
            console.error("Error writing to file:", err);
            return res.status(500).send("Error saving todo.");
        }
        console.log("Todo saved:", todo);
        res.send("Todo saved successfully!");
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
