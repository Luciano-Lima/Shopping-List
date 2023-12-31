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
	saveItemToLocalStorage(li.textContent)
	showUI() // Show UI elements
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

// Remove a list item when the remove button is clicked
const clearItem = () => {
	itemList.addEventListener('click', (e) => {
		if (e.target.classList.contains('fa-solid')) {
			e.target.parentNode.parentNode.remove() // Remove the list item
		}
		if (itemList.firstElementChild === null) {
			console.log(itemList.firstElementChild) // Log a message if the list is empty
			hideUI() // Hide UI elements if there are no items in the list
		}
	})
}

// Filter items based on user input
const filterItems = () => {
	filter.addEventListener('input', (e) => {
		let filterInputValue = e.target.value.toLowerCase() // Get user input, convert to lowercase
		const itemListTextContent = document.querySelectorAll('li') // Get all list items

		itemListTextContent.forEach((item) => {
			const items = item.textContent.toLowerCase().trim('').split(' ') // Get individual words in list item text
			const matchingItems = items.filter((char) => char.includes(filterInputValue)) // Filter matching words

			if (matchingItems.length > 0) {
				item.style.display = 'flex' // Show the item if there are matching words
			} else {
				item.style.display = 'none' // Hide the item if there are no matching words

				// hideUI() // Hide UI elements if there are no matching items
			}
		})
	})
}

// Hide UI elements
const hideUI = () => {
	filter.style.display = 'none' // Hide the filter input
	clearBtn.style.display = 'none' // Hide the clear button
}

// Show UI elements
const showUI = () => {
	itemList.style.display = 'flex' // Show the list
	filter.style.display = 'block' // Show the filter input
	clearAllBtn.style.display = 'block' // Show the clear all button
}

// Clear all items in the list
const clearAllItems = () => {
	const items = itemList.querySelectorAll('li') // Get all list items
	items.forEach((item) => {
		item.remove() // Remove each list item
	})
	clearItemsFromLocalStorage()
	hideUI() // Hide UI elements
}

//Save new items to localStorage
const saveItemToLocalStorage = (item) => {
	let items
	// Check if there are already items in localStorage
	if (localStorage.getItem('items') === null) {
		items = []
	} else {
		items = JSON.parse(localStorage.getItem('items'))
	}
	//Add new item to localStorage
	items.push(item)
	//Save the updated item list back to localStorage
	localStorage.setItem('items', JSON.stringify(items))
}

//Load item from localStorage to the Shopping List
const loadItemsFromLocalStorage = () => {
	let items
	if (localStorage.getItem('items') === null) {
		items = []
	} else {
		items = JSON.parse(localStorage.getItem('items'))
	}
	items.forEach((item) => {
		const li = document.createElement('li')
		li.textContent = item
		itemList.appendChild(li)

		const btn = createButton('remove-item btn-link text-red')
		li.appendChild(btn)
	})
}

const clearItemsFromLocalStorage = () => {
	localStorage.clear('items')
}

clearItem()
filterItems()

// Event listeners
submitBtn.addEventListener('click', getInputValue) // Listen for submit button click
clearAllBtn.addEventListener('click', clearAllItems) // Listen for clear all button click
addEventListener('DOMContentLoaded', () => loadItemsFromLocalStorage()) // Load items form local Storage
