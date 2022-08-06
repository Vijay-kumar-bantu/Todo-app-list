import "./App.css";
import Task from "./Task";
import { useState, useEffect } from "react";

function App() {
  const [tasks, up_tasks] = useState([]);

  useEffect(() => {
    fetching();
  }, []);

  // important functions

  const fetching = () => {
    try {
      fetch(process.env.REACT_APP_API_ADDRESS)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          var fetched_data = [];

          data.forEach((element) => {
            let date = new Date(element.date);

            var value = {
              name: element.task_name,
              id: element._id,
              date: `${date.toLocaleDateString(
                "en-IN"
              )} ${date.toLocaleTimeString()}`,
            };

            fetched_data.push(value);
          });

          up_tasks(fetched_data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const adding_tasks = (name) => {
    if (name !== "") {
      let user = { task: name };
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(user),
      };
      fetch(process.env.REACT_APP_API_ADDRESS, options)
        .then((res) => res.json())
        .then(() => {
          fetching();
        });
    } else {
      alert("Please enter the task");
    }
  };

  const deleting_tasks = (task_id) => {
    let deleted_one = { id: task_id };
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(deleted_one),
    };

    fetch(process.env.REACT_APP_API_ADDRESS, options)
      .then((res) => res.json())
      .then(() => {
        fetching();
      });
  };

  // button functions

  const add_func = () => {
    const input = document.querySelector(".form_input input");

    adding_tasks(input.value);
    input.value = "";
  };

  const delete_func = (e) => {
    const task_id = e.target.parentElement.id;
    deleting_tasks(task_id);
  };

  const key_func = (e) => {
    const add_button = document.querySelector(".form_input>button");
    if (e.code === "Enter") {
      add_button.click();
    }
  };

  //rendering part

  return (
    <div className="App">
      <header>
        <h1>TODO APP LIST</h1>
      </header>

      <section className="form_input">
        <input
          type="text"
          placeholder="Enter you task......"
          onKeyDown={key_func}
        />
        <button onClick={add_func}>ADD</button>
      </section>
      <section className="tasks_area">
        <Task tasks={tasks} del={delete_func} />
      </section>
    </div>
  );
}

export default App;
