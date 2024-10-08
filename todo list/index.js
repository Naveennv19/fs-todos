const inputBox = document.getElementById("input-box");
        const list = document.getElementById("lists");

        function addTodo() {
            if (inputBox.value === '') {
                alert("Add your todo");
            } else {
                let li = document.createElement("li");
                li.innerHTML = inputBox.value;
                list.appendChild(li);
                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                li.appendChild(span);

                fetch('/addTodo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ todo: inputBox.value })
                })
                .then(response => response.text())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
            }
            inputBox.value = '';
        }

        list.addEventListener("click", function (e) {
            console.log(e);
            if (e.target.tagName === "LI") {
                e.target.classList.toggle("checked");
                
            } else if (e.target.tagName === "SPAN") {
                e.target.parentElement.remove();
            }
        }, false);