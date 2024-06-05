// script.js

document.addEventListener('DOMContentLoaded', () => {
    const newNoteButton = document.getElementById('new-note');
    const noteTitleInput = document.getElementById('note-title');
    const noteContentInput = document.getElementById('note-content');
    const savedNotesContainer = document.getElementById('saved-notes');
    const trashContainer = document.getElementById('trash');
    const fontSizeInput = document.getElementById('font-size');
    const fontFamilySelect = document.getElementById('font-family');
    const saveNoteButton = document.getElementById('save-note');
    const deleteNoteButton = document.getElementById('delete-note');
    const emptyTrashButton = document.getElementById('empty-trash');
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let trash = JSON.parse(localStorage.getItem('trash')) || [];
    let currentNoteIndex = null;

    const saveNotes = () => {
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
    };

    const saveTrash = () => {
        localStorage.setItem('trash', JSON.stringify(trash));
        displayTrash();
    };

    const displayNotes = () => {
        savedNotesContainer.innerHTML = '<h3>Saved Notes</h3>';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.textContent = note.title;
            noteElement.className = 'note-item';
            noteElement.addEventListener('click', () => loadNote(index));
            savedNotesContainer.appendChild(noteElement);
        });
    };

    const displayTrash = () => {
        trashContainer.innerHTML = '<h3>Trash</h3>';
        trash.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.textContent = note.title;
            noteElement.className = 'trash-item';
            trashContainer.appendChild(noteElement);
        });
    };

    const loadNote = (index) => {
        const note = notes[index];
        noteTitleInput.value = note.title;
        noteContentInput.value = note.content;
        currentNoteIndex = index;
    };

    const saveCurrentNote = () => {
        const title = noteTitleInput.value || noteContentInput.value.split(' ').slice(0, 5).join(' ');
        const content = noteContentInput.value;
        if (content) {
            if (currentNoteIndex !== null) {
                notes[currentNoteIndex].title = title;
                notes[currentNoteIndex].content = content;
            } else {
                notes.push({ title, content });
            }
            saveNotes();
            currentNoteIndex = notes.length - 1;
        }
    };

    newNoteButton.addEventListener('click', () => {
        saveCurrentNote();
        noteTitleInput.value = '';
        noteContentInput.value = '';
        currentNoteIndex = null;
    });

    saveNoteButton.addEventListener('click', saveCurrentNote);

    deleteNoteButton.addEventListener('click', () => {
        if (currentNoteIndex !== null) {
            trash.push(notes[currentNoteIndex]);
            notes.splice(currentNoteIndex, 1);
            saveNotes();
            saveTrash();
            noteTitleInput.value = '';
            noteContentInput.value = '';
            currentNoteIndex = null;
        }
    });

    emptyTrashButton.addEventListener('click', () => {
        trash = [];
        saveTrash();
    });

    fontSizeInput.addEventListener('input', (e) => {
        noteContentInput.style.fontSize = ${e.target.value}px;
        noteTitleInput.style.fontSize = ${e.target.value}px;
    });

    fontFamilySelect.addEventListener('change', (e) => {
        noteContentInput.style.fontFamily = e.target.value;
        noteTitleInput.style.fontFamily = e.target.value;
    });

    displayNotes();
    displayTrash();
});