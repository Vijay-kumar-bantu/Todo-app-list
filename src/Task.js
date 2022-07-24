const Task = ({ tasks, del }) => {
  return tasks.map((task) => {
    return (
      <div id={task.id} key={task.id} className="task_bar">
        <p>{task.name}</p>
        <button id={task.id} onClick={del}>
          DELETE
        </button>
      </div>
    );
  });
};

export default Task;
