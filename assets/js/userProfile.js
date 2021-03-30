// let params = new URLSearchParams(window.location.search);
// let userId = params.get('courseId');
let token = localStorage.getItem('token');

let userProfileLi;
let enrolledCourseLi;


fetch('http://localhost:4000/api/users/details', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
})
    .then(res => {
        return res.json()
    })
    .then(data => {

        console.log(data)

        let enrollments = data.enrollments
        // let enrollmentList = [];
        let courseList = [];

        for (let enrollment of enrollments){
            console.log(enrollment.courseId);
            

            fetch(`http://localhost:4000/api/courses/${enrollment.courseId}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)

                let courses = {courseName: data.name, courseDescription: data.description}
                console.log(courses)

                
                courseList.push(courses)
                
                
                
        
                // if (data) {
                //     enrolledCourseLi = 
                //     `
                //         <li>${data.name}<ul><li style="list-style-type:none">${data.description}</li></ul></li>
                        
                //     `

                //     let enrolledCourse = document.querySelector('#enrolled-course')
                //     enrolledCourse.innerHTML = enrolledCourseLi;
                // }
            })
            console.log(courseList)

            
        }

        if(data){
            userProfileLi = 
                `
                    <li style="list-style-type:none"><b>Firstname:</b> ${data.firstName}</li>
                    <li style="list-style-type:none"><b>Lastname:</b> ${data.lastName}</li>
                    <li style="list-style-type:none"><b>Email:</b> ${data.email}</li>
                    <li style="list-style-type:none"><b>Mobile Number:</b> ${data.mobileNo}</li>
                    <li style="list-style-type:none"><b>Enrollments:</b> <ul id="enrolled-course">${courseList}</ul></li>
                `

        } else {
           
            alert("Something went wrong")
        }

        let userProfile = document.querySelector('#user-profile');
        userProfile.innerHTML = userProfileLi;
    })