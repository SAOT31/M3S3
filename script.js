// Get the screen elements so I can use them.
const noteInput = document.getElementById('noteInput');
const addBtn = document.querySelector('#addBtn');
const notesList = document.getElementById('notesList');

// Show what I found in the console to check that everything is okay.
console.log(noteInput, addBtn, notesList);

// Check if there are notes already saved in the browser memory.
// If they exist, use them. If not, start with an empty list.
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// See how many notes loaded at the start.
console.log(notes.length);

// Function to save my current list to the browser memory.
function saveToStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to create and show a note on the page.
function createNoteElement(text) {
    // Create the list element (the row).
    const li = document.createElement('li');
    li.textContent = text;

    // Create the delete button.
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginLeft = '10px';

    // Tell the button what to do when clicked:
    deleteBtn.addEventListener('click', () => {
        // 1. Remove it from the screen.
        notesList.removeChild(li);
        
        // 2. Remove it from my data list (filter to keep everything except this one).
        notes = notes.filter(n => n !== text);
        
        // 3. Save the updated list to memory.
        saveToStorage();
        
        console.log("Deleted:", text);
    });

    // Put the button inside the row and the row inside the visual list.
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
}

// Loop through the notes I already had saved and show them one by one.
notes.forEach(note => {
    createNoteElement(note);
});

// Configure what happens when I click the "Add Note" button.
addBtn.addEventListener('click', () => {
    // Take the text I wrote and remove spaces from the beginning and end.
    const text = noteInput.value.trim();

    // If it is empty, show an alert and stop here.
    if (text === "") {
        alert("Please write a note!");
        return;
    }

    // Add the new note to my data list.
    notes.push(text);
    
    // Save changes to memory.
    saveToStorage();
    
    // Put the new note on the screen.
    createNoteElement(text);
    
    console.log("Added:", text);

    // Clear the text field so I can write another note.
    noteInput.value = "";
    noteInput.focus();
});