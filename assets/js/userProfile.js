// let params = new URLSearchParams(window.location.search);
// let userId = params.get('courseId');
let token = localStorage.getItem('token');

let userProfileLi;
// let enrolledCourseLi;


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

        if (data.isAdmin == false) { //if isAdmin is false, run this code

            let enrollments = data.enrollments
            let courseList = [];
            let userEnrollments = document.querySelector('#user-enrollments')


            for (let enrollment of enrollments){
                console.log(enrollment.courseId);
                

                fetch(`http://localhost:4000/api/courses/${enrollment.courseId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    
                    courseList.push({courseName: data.name, courseDescription: data.description})
                    userEnrollments.innerHTML= "";
                
                    for (let i=0; i<courseList.length; i++){
                        console.log(courseList[i].courseName)
                        console.log(courseList[i].courseDescription)

                        const newLi = document.createElement('li');
                        newLi.append(`${courseList[i].courseName}: ${courseList[i].courseDescription}`)
                        userEnrollments.append(newLi)
                    }

                    // if (courseList) {
                    //     enrolledCourseLi = 
                    //     `
                    //         <li>${data.name}<ul><li style="list-style-type:none">${data.description}</li></ul></li>
                            
                    //     `

                    //     let enrolledCourse = document.querySelector('#enrolled-course')
                    //     enrolledCourse.innerHTML = enrolledCourseLi;
                    // }
                })   
            }       
        } else { //if data.isAdmin == false (end)  
            const newLi = document.createElement('li');
            newLi.append(`Not applicable`);
            let userEnrollments = document.querySelector('#user-enrollments');
            userEnrollments.append(newLi);
        } //end else statement

        if(data){
            userProfileLi = 
                `
                    <li style="list-style-type:none"><b>Firstname:</b> ${data.firstName}</li>
                    <li style="list-style-type:none"><b>Lastname:</b> ${data.lastName}</li>
                    <li style="list-style-type:none"><b>Email:</b> ${data.email}</li>
                    <li style="list-style-type:none"><b>Mobile Number:</b> ${data.mobileNo}</li>
                `

        } else {
           
            alert("Something went wrong")
        }

        let userProfile = document.querySelector('#user-profile');
        userProfile.innerHTML = userProfileLi;
    })