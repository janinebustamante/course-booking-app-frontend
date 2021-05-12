let formSubmit = document.querySelector("#createCourse");

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();

  let courseName = document.querySelector("#courseName").value;
  let description = document.querySelector("#courseDescription").value;
  let price = document.querySelector("#coursePrice").value;

  let token = localStorage.getItem("token");

  fetch(`${api.baseUrl}/api/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: courseName,
      description: description,
      price: price,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //creation of new course successful
      if (data === true) {
        //redirect to course page
        alert("New course added!");
        window.location.replace("./courses.html");
      } else {
        //redirect in creating course
        alert("Something went wrong.");
      }
    });
});
