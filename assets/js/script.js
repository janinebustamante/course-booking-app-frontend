//Add the logic that will show the login button when a user is not logged in


let navItems = document.querySelector("#navSession")
console.log(navItems)

let userToken = localStorage.getItem("token")
console.log(userToken)

if(!userToken) {
	navItems.innerHTML = 
	`
		<li class="nav-item"> 
			<a href="./login.html" class="nav-link"> Log in </a>
		</li>
	`
} else {
	navItems.innerHTML = 
	`
		<li class="nav-item" > 
			<a href="./userProfile.html" class="nav-link"> Profile </a>
		</li>
		<li class="nav-item"> 
			<a href="./logout.html" class="nav-link"> Log out </a>
		</li>
	`
}
