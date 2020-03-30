import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note"
import notes from "../Notes"

function createNotes(note) {
  return (
    < Note
    title = {note.title}
    content = {note.content}/>
  )
}

function App() {
  return (
    <div>
    <Header/>
    <Footer/>
   {notes.map(createNotes)}
   </div>
  )
}

export default App;
