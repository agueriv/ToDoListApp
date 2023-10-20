const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const listCompleted = document.getElementById("list-completed");
const title = document.getElementById("title-bar");

function addTask() {
  if (inputBox.value === "" || inputBox.value === null) {
    $(document).ready(function () {
      toastr.options = {
        closeButton: true,
        newestOnTop: true,
        progressBar: true,
        preventDuplicates: true,
        positionClass: "toast-top-center",
      };
      toastr["error"]("Debes escribir una tarea brodi", "Error");
    });
  } else {
    let li = document.createElement("li");
    li.classList.add("undone");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

function done(e) {
  // Pasarlo a completed
  let li = document.createElement("li");
  li.innerHTML = e.target.innerHTML;
  li.classList.add("checked");
  listCompleted.appendChild(li);

  // Eliminarlo de container
  e.target.remove();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      e.target.classList.toggle("undone");
      // Desvanecer
      $(".checked").animate({ opacity: "0" }, { duration: 750, queue: false });
      setTimeout(function () {
        done(e);
      }, 750);

      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function unDone(e) {
  // Pasarlo a container
  let li = document.createElement("li");
  li.innerHTML = e.target.innerHTML;
  listContainer.appendChild(li);

  // Eliminarlo de completed
  e.target.remove();
}

listCompleted.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      e.target.classList.toggle("undone");

      // Desvanecer
      $(".undone").animate({ opacity: "0" }, { duration: 750, queue: false });
      setTimeout(function () {
        unDone(e);
      }, 750);

      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
  localStorage.setItem("dataCompleted", listCompleted.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
  listCompleted.innerHTML = localStorage.getItem("dataCompleted");
}

title.addEventListener(
  "click",
  function (e) {
    const today = document.getElementById("today");
    const complete = document.getElementById("complete");
    if (e.target.id == "today") {
      e.target.classList.add("active");
      complete.classList.remove("active");
      listCompleted.classList.add("hidden");
      listContainer.classList.remove("hidden");
    } else if (e.target.id == "complete") {
      e.target.classList.add("active");
      today.classList.remove("active");
      listCompleted.classList.remove("hidden");
      listContainer.classList.add("hidden");
    }
  },
  false
);

showTask();
