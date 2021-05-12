// const deleteCourse = () => {
// getting id from url
// let token = localStorage.getItem('token');
// const url_string = window.location.href; //window.location.href
// const url = new URL(url_string);
// const courseId = url.searchParams.get("courseId");

let params = new URLSearchParams(window.location.search);
let courseId = params.get("courseId");
let token = localStorage.getItem("token");

fetch(`${api.baseUrl}/api/courses/${courseId}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    if (data === true) {
      let deleteH2 = document.querySelector("h2.my-5");
      deleteH2.innerHTML = `
                    Course successfully deleted.
                `;

      // alert('Course is now deleted!')
      // window.location.replace("./courses.html")
    } else {
      //redirect in creating course
      alert("Something went wrong");
    }
  });
console.log("deleting");
// }

// deleteCourse()
