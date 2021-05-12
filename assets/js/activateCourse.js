let params = new URLSearchParams(window.location.search);
let courseId = params.get("courseId");
let token = localStorage.getItem("token");

fetch(`${api.baseUrl}/api/courses/${courseId}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    isActive: true,
  }),
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    if (data) {
      let activateH2 = document.querySelector("h2.my-5");
      activateH2.innerHTML = `
                    Course is now activated.
                `;
    } else {
      //redirect in creating course
      alert("Something went wrong");
    }
  });
