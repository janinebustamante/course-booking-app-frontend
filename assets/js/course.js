//window.location.search returns the query string part of the URL
//URLSearchParams - object where it instantiates to execute methods we access in

// console.log(window.location.search);

let params = new URLSearchParams(window.location.search);
let courseId = params.get("courseId");
let token = localStorage.getItem("token");

// console.log(courseId);

let courseName = document.querySelector("#courseName");
let courseDescription = document.querySelector("#courseDescription");
let coursePrice = document.querySelector("#coursePrice");
let enrollContainer = document.querySelector("#enrollContainer");

//` because we will use variable name
fetch(`${api.baseUrl}/api/courses/${courseId}`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    courseName.innerHTML = data.name;
    courseDescription.innerHTML = data.description;
    coursePrice.innerHTML = data.price;
    enrollContainer.innerHTML = `
            <button id="enrollButton" class="btn btn-block btn-primary">
                Enroll
            </button>
        `;

    document.querySelector("#enrollButton").addEventListener("click", (e) => {
      e.preventDefault();
      //insert the course to our courses collection
      fetch(`${api.baseUrl}/api/users/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId: courseId,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          //creation of new course successful
          if (data === true) {
            //redirect to course page
            alert("Thank you for enrolling! See you!");
            window.location.replace("./courses.html");
          } else {
            //redirect in creating course
            alert("Something went wrong.");
          }
        });
    });
  });
