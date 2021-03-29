//Add an event to the register form

let registerForm = document.querySelector("#registerUser")
console.log(registerForm)


//add an event listener that will trigger when the user submits the form
registerForm.addEventListener('submit', (e) =>{
	e.preventDefault()
	//prevents page redirection to avoid loss of input data whenever the registration process is not successful


//select all the input fields by adding query selector 
	let firstName = document.querySelector("#firstName").value;
	let lastName = document.querySelector("#lastName").value;
	let mobileNo = document.querySelector("#mobileNumber").value;
	let email = document.querySelector("#userEmail").value;
	let password1 = document.querySelector("#password1").value;
	let password2 = document.querySelector("#password2").value;

//validation to enable submit button when all fields are populated and both passwords match. and mobile no is equal to 11
	
	if((password1 !== '' && password2 !== '' ) && (password2 === password1) && (mobileNo.length === 11)){

		//check for duplicate email in database first
		fetch('http://localhost:4000/api/users/email-exists', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email
			})
			})
		.then(res => res.json())
		.then(data => {
			console.log(data);
		

		//if no duplicates found
		if (data === false) {
			fetch('http://localhost:4000/api/users/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password1,
					mobileNo: mobileNo
				})
			})
			.then(res => res.json())
			.then(data => {
				console.log(data)

				if(data === true) {
					//Registration successful
					alert("registered successfuly")
					//redirect to login
					window.location.replace("./login.html");
				}else {
					alert("Something went wrong");
				}
			})
			.catch((error) => {
			  console.error('Error:', error);
			});
		}
		})

	}else {
		alert("Please check the information provided")
	}


})