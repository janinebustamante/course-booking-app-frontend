let params = new URLSearchParams(window.location.search);
let courseId = params.get('courseId');
let token = localStorage.getItem('token');

fetch(`http://localhost:4000/api/courses/${courseId}`, {
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

    //course details
    let enrolleeData = 
        `
            <li style="list-style-type:none"><b>Course name:</b> ${data.name}</li>
            <li style="list-style-type:none"><b>Description:</b> ${data.description}</li>
            <li style="list-style-type:none"><b>Price: &#8369;</b> ${data.price}</li>
        `
    
    let courseDetailsUl = document.querySelector('#course-details');
    courseDetailsUl.innerHTML = enrolleeData;

    //enrollees list
    let enrolleeIds = data.enrollees.map((e) => e.userId); //makes new array of userIds only
    let uniqueEnrolleeIds = [...new Set(enrolleeIds)]; //makes new array with no duplicates

    let enrolleesUl = document.querySelector('#enrollees')

    //loop on all enrollee ids, then fetch each data
    for (enrolleeId of uniqueEnrolleeIds) {

        fetch(`http://localhost:4000/api/users/${enrolleeId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            let fullName = `${data.firstName} ${data.lastName}`;
            
            let enrolleesLi = document.createElement('li');
            enrolleesLi.innerHTML = fullName;
            enrolleesUl.append(enrolleesLi);
        })
    }
})