//create an admin user variable
//store variable isAdmin key in user
let adminUser = localStorage.getItem("isAdmin");

//cardfooter will be dynamically rendered if the user is an admin or not
let cardFooter;

//fetch request to all the available user 
fetch('http://localhost:4000/api/courses')
.then(res => res.json())
.then(data => {
    //log the data to check if you were able to fetch the data from the server
    console.log(data)
    
    //courseData will store the data to be rendered
    let courseData;

    if (data.length < 1) {
        courseData = "No courses available."
    } else {
        //will iterate the courses collection and display each course
        courseData = data.map(course => {
            //check the make up of each element inside the courses collection
            console.log(course._id)

            //if the user is a regular user, display when the course was created
            if(adminUser == "false" || !adminUser) {
                cardFooter =
                    `
                        <a href="./course.html?courseId=${course._id}" value="${course._id}" class="btn btn-primary text-white btn-block editButton">
                            Select Course
                        </a>
                    `

            } else {
                //check if user is admin, role to edit and redirect to edit and delete course
                cardFooter = 
                    `
                        <a href="./viewCourse.html?courseId=${course._id}" value="${course._id}" class="btn btn-primary text-white btn-block viewButton">
                            View Course
                        </a>
                        <a href="./editCourse.html?courseId=${course._id}" value="${course._id}" class="btn btn-primary text-white btn-block editButton">
                            Edit Course
                        </a>
                        <a href="./deleteCourse.html?courseId=${course._id}" value="${course._id}" class="btn btn-primary text-white btn-block dangerButton">
                            Delete Course
                        </a>
                    `
            }
            return (
                `
                    <div class="col-md-6 my-3">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">
                                    ${course.name}
                                </h5>
                                <p class="card-text text-left">
                                    ${course.description}
                                </p>
                                <p class="card-text text-right">
                                    ${course.price}
                                </p>
                            </div>
                            <div class="card-footer">
                                ${cardFooter}
                            </div>
                        </div>
                    </div>
                `
            )
        }).join(""); //courses collection is array
    }
    let container = document.querySelector("#coursesContainer")

    //get the value of courseData and assign it as the #courseContainer's content
    container.innerHTML = courseData;
})

//add modal - if user is an admin, there will be a button to add a course
let modalButton = document.querySelector("#adminButton");

if (adminUser == "false" || !adminUser) {
    //if user is a regular user, do not show add course button
    modalButton.innerHTML = null
} else {
    //display add course if user is an admin
    modalButton.innerHTML = 
        `
            <div class="col-md-2 offset-md-10">
                <a href="./addCourse.html" class="btn btn-block btn-primary">Add Course</a>
            </div>
        `
}