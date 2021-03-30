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

    let enrolleeIds = data.enrollees.map((e) => e.userId);
    let uniqueEnrolleeIds = [...new Set(enrolleeIds)]; //makes new array with no duplicates

    let enrolleesUl = document.querySelector('#enrollees')

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