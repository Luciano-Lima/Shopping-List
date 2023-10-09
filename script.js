// Get DOM elements
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const submitBtn = document.querySelector('.btn')
const clearBtn = document.querySelector('.btn-clear')
const alertMsg = document.querySelector('.alertMsg')
const filter = document.getElementById('filter')
const clearAllBtn = document.getElementById('clear')

// Get input value from form
const getInputValue = (e) => {
	e.preventDefault() // Prevent default form submission behavior
	errorMsg() // Check for errors before proceeding
}


// Show an error message if the input is empty
const errorMsg = () => {
	if (itemInput.value === '') {
		alertMsg.style.display = 'block' // Display the error message
	} else {
		createLiElement() // Create a new list item if input is not empty
	}
}

// Event listeners
submitBtn.addEventListener('click', getInputValue) // Listen for submit button click