let deleteButton = document.querySelector('#deleteButton');
let disableH2 = document.querySelector('.my-5');


deleteButton.addEventListener('click', (e) => {
    e.preventDefault();

    let params = new URLSearchParams(window.location.search);
    let courseId = params.get('courseId');
    let token = localStorage.getItem('token');

    let courseName = document.querySelector('#courseName');
    let description = document.querySelector('#courseDescription');
    let price = document.querySelector('#coursePrice');

    fetch(`http://localhost:4000/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data);

            if (data) {
                data.isActive = false;
                console.log(data)

                alert ("Course deleted!")
                window.location.replace("./courses.html")
            } else {
                alert ("Something went wrong.")
            }
        })
})