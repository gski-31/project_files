// similar to other apps but includes other methods and local storage

// grab the page elements
const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// array to hold the state of our app
let items = [];

// create submit event
function submitHandler(e) {
        e.preventDefault(); // not goign to a form, getting displayed in lower div
        const name = e.currentTarget.item.value; // grab via form name
        if (!name) return; // no empty submissions
        console.log(name);
        // when creating a list give each a unique id
        // create a new object for each entry and push to the array
        const item = {
                name, // var from above
                id: Date.now(), // easy unique identifier
                complete: false, // just added so not completed yet
        };
        // push the item/object to storage array
        items.push(item);
        console.log(items);
        // clear all forms on submit
        e.target.reset();
        // call display all the items function
        // displayItems();
        // fire off a custom event that will let all know that the items have been updated!
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// function to display all the items
function displayItems() {
        const html = items
                .map(
                        item =>
                                `<li class="shopping-item"><input type="checkbox"><span class="itemName">${item.name}</span><button aria-label="remove ${item.name}">&times;<button></li>`
                )
                .join('');
        list.innerHTML = html;
}

// STORE TO LOCAL STORAGE
function mirrorToLocalStorage() {
        console.info('Saving items to local storage');
        localStorage.setItem('items', JSON.stringify(items));
}

// RESTORE FROM LOCAL STORAGE
function restoreFromLocalStorage() {
        console.info('Restoring from Local Storage');
        // grab the items from storage
        const lsItems = JSON.parse(localStorage.getItem('items'));
        if (lsItems.length) {
                items.push(...lsItems);
                list.dispatchEvent(new CustomEvent('itemsUpdated'));
        }
}

//  DELETE ITEM
function deleteItem(id) {
        items = items.filter(item => item.id !== id);
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// COMPLETE ITEM
function markAsComplete(id) {
        const itemRef = items.find(item => item.id === id);
        itemRef.complete = !itemRef.complete;
        list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', submitHandler); // submit is better than click, enter, etc.. for forms
// CUSTOM EVENT callback
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);

// EVENT DELEGATION
// Listen for the click on list <ul>  then delegate the click over to the button if was clicked
list.addEventListener('click', function(e) {
        const id = parseInt(e.target.value);
        if (e.target.matches('button')) {
                deleteItem(id);
        }
        if (e.target.matches('input[type="checkbox"]')) {
                markAsComplete(id);
        }
});

restoreFromLocalStorage();
