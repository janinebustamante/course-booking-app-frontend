let formSubmit = document.querySelector('#editCourse');

formSubmit.addEventListener('submit', (e) => {
    e.preventDefault()

    let params = new URLSearchParams(window.location.search);
    let courseId = params.get('courseId');
    let token = localStorage.getItem('token');

    let courseName = document.querySelector('#courseName').value;
    let description = document.querySelector('#courseDescription').value;
    let price = document.querySelector('#coursePrice').value;

    fetch('http://localhost:4000/api/courses', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            courseId : `${courseId}`,
            name: courseName,
            description: description,
            price: price
            })
    })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            if (data === true) {
                alert ("Course updated!")
                window.location.replace("./courses.html")
            } else {
                alert ("Something went wrong.")
            }
        })
    })