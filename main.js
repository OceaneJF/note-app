const add = document.querySelector("#add");
const container = document.querySelector("#container");

add.addEventListener("click", function () {
  const parser = new DOMParser();
  const html = parser.parseFromString(newNote(true), "text/html");
  const textarea = html.querySelector("textarea");
  container.insertBefore(textarea, add);
  textarea.addEventListener("dblclick", function () {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(textarea);
    }
  });

  textarea.addEventListener("input", function () {
    const notes = getItem().map(function (noteLocalStorage) {
      if (parseInt(textarea.id) === parseInt(noteLocalStorage.id)) {
        noteLocalStorage.content = textarea.value;
      }
      return noteLocalStorage;
    });

    saveItem(notes);
  });
});

getItem().map(function (note) {
  const parser = new DOMParser();
  const html = parser.parseFromString(newNote(false, note.id), "text/html");
  const textarea = html.querySelector("textarea");
  container.insertBefore(textarea, add);
  textarea.addEventListener("dblclick", function () {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(textarea);
    }
  });
  textarea.addEventListener("input", function () {
    const notes = getItem().map(function (noteLocalStorage) {
      if (parseInt(note.id) === parseInt(noteLocalStorage.id)) {
        noteLocalStorage.content = textarea.value;
      }
      return noteLocalStorage;
    });
    saveItem(notes);
  });
  textarea.value = note.content;
});

function deleteNote(note) {
  const newNotes = getItem().filter(function (noteLocalStorage) {
    return parseInt(note.id) === parseInt(noteLocalStorage.id);
  });
  saveItem(newNotes);
  container.removeChild(note);
}

function newNote(ajouter = false, id = 0) {
  if (ajouter) {
    const note = {
      id: Math.floor(Math.random() * 100000),
      content: "",
    };
    id = note.id;
    const notes = getItem();
    notes.push(note);
    saveItem(notes);
  }
  return `<textarea placeholder="Ecrire texte..."
              name=""
              id="${id}"
              cols="30"
              rows="10"
              class="w-64 h-52 border border-violet border-opacity-20 bg-white bg-opacity-70 backdrop-blur-md rounded-lg hover:shadow-3xl p-3  focus:bg-opacity-100 focus:outline-none focus:ring-1 focus:ring-violet-300 focus:shadow-3xl"></textarea>`;
}

function saveItem(notes) {
  window.localStorage.setItem("tabNotes", JSON.stringify(notes));
}

function getItem() {
  return JSON.parse(window.localStorage.getItem("tabNotes") || "[]");
}
