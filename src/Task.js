const Task = ({ tasks, del }) => {
  const task_click = (e) => {
    e.target.classList.toggle("expand");
  };

  const iconFun = () => {
    console.log("hai");
  };

  return tasks.map((task) => {
    return (
      <div key={task.id} id={task.id} onClick={task_click} className="task_bar">
        <p>{task.name}</p>

        <button onClick={del} className="del_button">
          DELETE
        </button>

        <p className="para2">Created on {task.date}</p>
      </div>
    );
  });
};

export default Task;
