let loginForm = document.querySelector("#logInUser");

//add event listener to the form
//(e) meaning when it is triggered, it will create an event object
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = document.querySelector("#userEmail").value;
  let password = document.querySelector("#password").value;

  // console.log(email);
  // console.log(password);

  if (email == "" || password == "") {
    alert("Please input your email and/or password.");
  } else {
    fetch(`${api.baseUrl}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.accessToken) {
          //store JWT in local storage
          localStorage.setItem("token", data.accessToken);
          //send fetch request to decode JWT and obtain user ID and role for storing in context
          fetch(`${api.baseUrl}/api/users/details`, {
            //``
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              //set the global user to have properties containing authenticated user's ID and role
              localStorage.setItem("id", data._id);
              localStorage.setItem("isAdmin", data.isAdmin);
              window.location.replace("./courses.html");
            });
        } else {
          //authentication failure
          alert("Something went wrong!");
        }
      });
  }
});
