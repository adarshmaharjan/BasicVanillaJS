// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = '';

// ****** EVENT LISTENERS **********
//load items
window.addEventListener('DOMContentLoaded', () => {
	setUpItems();
});
//Form event listener
form.addEventListener('submit', (e) => {
	e.preventDefault();
	addItem();
	// console.log(e.currentTarget);
	// console.log(grocery.value);
});
//clear button event listener
clearBtn.addEventListener('click', () => {
	clearItems();
});
// const deleteBtn = document.querySelector('.delete-btn');
// console.log(deleteBtn);
// ****** FUNCTIONS **********
//addItems
const addItem = () => {
	container.classList.add('show-container');
	const value = grocery.value;
	const id = new Date().getTime().toString();
	//if there is no value and the edit flag is false i.e if edit is not enabled
	if (value && !editFlag) {
		// console.log('add item to the list');
		createListItem(id, value);
		//alert after adding item
		displayAlert('Item added', 'success');

		//add to local value
		addToLocalStorage(id, value);
		//set back to default
		setBackToDefault();
	} else if (value !== '' && editFlag) {
		// console.log('editing');
		editElement.innerHTML = value;
		displayAlert('item edited', 'success');
		//edit local storage
		editLocalStorage(editID, value);
		setBackToDefault();
	} else {
		displayAlert('please enter the value', 'danger');
	}
};
//functions
//delete function
const deleteItem = (e) => {
	const element = e.currentTarget.parentElement.parentElement;
	const id = element.dataset.id;
	list.removeChild(element);
	if (list.children.length === 0) {
		container.classList.remove('show-container');
	}
	// console.log(element);
	displayAlert('item removed', 'success');
	console.log('Item deleted');
	setBackToDefault();
	//remove from local storage
	removeFromLocalStorage(id);
};
//edit function
const editItem = (e) => {
	// console.log('Edit Item');
	const element = e.currentTarget.parentElement.parentElement;
	// console.log(element);
	editElement = e.currentTarget.parentElement.previousElementSibling;
	// console.log(editElement);
	//set form value
	grocery.value = editElement.textContent;
	editFlag = true;
	editID = element.dataset.id;
	submitBtn.textContent = 'edit';
};
//display alert
const displayAlert = (text, action) => {
	alert.classList.add(`alert-${action}`);
	alert.textContent = text;
	setTimeout(() => {
		alert.classList.remove(`alert-${action}`);
		alert.textContent = '';
	}, 1000);
};
//clear items
const clearItems = () => {
	const items = document.querySelectorAll('.grocery-item');
	if (items.length > 0) {
		items.forEach((item) => {
			list.removeChild(item);
		});
	}
	container.classList.remove('show-container');
	displayAlert('empty-list', 'danger');
	//clear all the items in local storage
	// localStorage.setItem('list', JSON.stringify([]));
	localStorage.removeItem('list');
	setBackToDefault();
};
//set back to default
const setBackToDefault = () => {
	// console.log('Set back to default');
	grocery.value = '';
	editFlag = false;
	editID = '';
	submitBtn.textContent = 'submit';
};
// ****** LOCAL STORAGE **********
const addToLocalStorage = (id, value) => {
	// console.log('added to local storage ');
	const grocery = { id, value };
	let items = getLocalStorage();
	console.log(items);
	items.push(grocery);
	localStorage.setItem('list', JSON.stringify(items));
	// console.log(items);

	// console.log(grocery);
};
const removeFromLocalStorage = (id) => {
	let items = getLocalStorage();
	items = items.filter((item) => item.id !== id);
	// console.log(items);
	localStorage.setItem('list', JSON.stringify(items));
};
const editLocalStorage = (id, value) => {
	let items = getLocalStorage();
	items = items.map((item) => {
		if (item.id === id) {
			item.value = value;
		}
		return item;
	});
	localStorage.setItem('list', JSON.stringify(items));
};
const getLocalStorage = () => {
	return localStorage.getItem('list')
		? JSON.parse(localStorage.getItem('list'))
		: [];
};
//localStorage API
//setItem
//getItem
//removeItem
// save as string
/*Just a reference */
// localStorage.setItem('orange', JSON.stringify(['item', 'item2']));
// const oranges = JSON.parse(localStorage.getItem('orange'));
// localStorage.removeItem('orange');

// ****** SETUP ITEMS **********
const setUpItems = () => {
	let items = getLocalStorage();
	if (items.length > 0) {
		items.forEach((item) => {
			createListItem(item.id, item.value);
		});
		container.classList.add('show-container');
	}
};
const createListItem = (id, value) => {
	const element = document.createElement('article');
	//added class
	element.classList.add('grocery-item');
	//add id
	const attr = document.createAttribute('data-id');
	//assigned a data id a value of random id create above
	//i.e 	const id = new Date().getTime().toString();
	attr.value = id;
	//assign data-id as an attribute in html through js
	element.setAttributeNode(attr);
	//added extra content in the our created div
	element.innerHTML = `
						<p class="title">${value}</p>
						<div class="btn-container">
							<button type="button" class="edit-btn">
								<i class="fas fa-edit"></i>
							</button>
							<button type="button" class="delete-btn">
								<i class="fas fa-trash"></i>
							</button>
						</div>
		`;
	//append child or an element after the submission
	//for more info go youtube or MDN
	list.appendChild(element);
	//show container
	element.classList.add('show-container');
	//edit functionality
	const deleteBtn = list.querySelectorAll('.delete-btn');
	const editBtn = list.querySelectorAll('.edit-btn');

	deleteBtn.forEach((btn) => btn.addEventListener('click', deleteItem));
	editBtn.forEach((btn) => btn.addEventListener('click', editItem));
};
