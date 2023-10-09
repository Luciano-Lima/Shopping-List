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

// Create a new list item
const createLiElement = () => {
	const li = document.createElement('li') // Create a new list item element
	li.textContent = itemInput.value // Set its text content to the input value
	itemList.appendChild(li) // Append it to the list
	itemInput.value = '' // Clear the input field
	const btn = createButton('remove-item btn-link text-red') // Create a remove button
	li.appendChild(btn) // Append the button to the list item
	showUI() // Show UI elements
	console.log('calling showUI from createLiElement') // Log a message
}

// Create a button element
const createButton = (classes) => {
	const btn = document.createElement('button') // Create a button element
	btn.className = classes // Set its class name
	const icon = createIcon('fa-solid fa-xmark') // Create a remove icon
	btn.appendChild(icon) // Append the icon to the button
	return btn // Return the button element
}


// Create an icon element
const createIcon = (classes) => {
	const i = document.createElement('i') // Create an icon element
	i.className = classes // Set its class name
	return i // Return the icon element
}

// Event listeners
submitBtn.addEventListener('click', getInputValue) // Listen for submit button click