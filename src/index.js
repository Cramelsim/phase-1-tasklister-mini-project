document.addEventListener("DOMContentLoaded", () => {
  // Selecting form and task list elements
  const taskForm = document.querySelector("#create-task-form");
  const taskList = document.querySelector("#tasks");
  const checkbox = document.querySelector("#id-checkbox");
  const outputBox = document.getElementById("output-box");

  // Prevent checkbox default behavior
  if (checkbox) {
    checkbox.addEventListener("click", (event) => {
      const warn = "preventDefault() won't let you check this!\n";
      outputBox.innerText += warn;
      event.preventDefault();
    });
  }

  // Handle task form submission
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Gather form inputs
    const taskDescription = document.querySelector("#new-task-description").value;
    const priority = document.querySelector("#priority")?.value || "low";
    const user = document.querySelector("#user")?.value || "Unknown";
    const duration = document.querySelector("#duration")?.value || "0";
    const dueDate = document.querySelector("#due-date")?.value || "N/A";

    if (!taskDescription.trim()) return; // Ignore empty tasks

    // Create task element
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <span style="color: ${getPriorityColor(priority)};">${taskDescription}</span> 
      (Assigned to: ${user}, Duration: ${duration} hrs, Due: ${dueDate})
    `;

    // Add edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.style.marginLeft = "10px";
    editButton.addEventListener("click", () => editTask(taskItem));

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.addEventListener("click", () => taskItem.remove());

    // Add complete checkbox
    const completeCheckbox = document.createElement("input");
    completeCheckbox.type = "checkbox";
    completeCheckbox.style.marginLeft = "10px";
    completeCheckbox.addEventListener("change", () => {
      taskItem.style.textDecoration = completeCheckbox.checked ? "line-through" : "none";
    });

    // Append actions to the task
    taskItem.appendChild(completeCheckbox);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    // Append task to the list
    taskList.appendChild(taskItem);

    // Reset the form
    taskForm.reset();
  });

  // Helper function to get priority color
  function getPriorityColor(priority) {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "yellow";
      case "low":
        return "green";
      default:
        return "black";
    }
  }

  // Edit task functionality
  function editTask(taskItem) {
    const [text, extra] = taskItem.textContent.split("("); // Simplified parsing
    const taskDescription = prompt("Edit task description:", text.trim());
    if (taskDescription) {
      taskItem.firstChild.textContent = `${taskDescription} `;
    }
  }
});
