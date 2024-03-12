import "./AddBook.scss";
import { useState } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export const AddBook = ({ getBookList }) => {
  //add new book
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newLang, setNewLang] = useState("");
  const [newPages, setNewPages] = useState(0);
  const [newFormat, setNewFormat] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newReview, setNewReview] = useState(0);
  const [newSentiment, setNewSentiment] = useState("");

  const booksCollectionRef = collection(db, "books");

  const onSubmitBook = async (e) => {
    e.preventDefault();
    try {
      await addDoc(booksCollectionRef, {
        title: newTitle,
        author: newAuthor,
        genre: newGenre,
        lang: newLang,
        pages: newPages,
        format: newFormat,
        status: newStatus,
        review: newReview,
        sentiment: newSentiment,
      });
      console.log("document written with ID: ", booksCollectionRef.id);
      getBookList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-context">
      <h2>Add a Book</h2>
      <div className="new-entry-form">
        <form className="new-entry-form" onSubmit={onSubmitBook}>
          <input
            placeholder="Title"
            type="text"
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            placeholder="Author"
            onChange={(e) => setNewAuthor(e.target.value)}
            type="text"
          />
          <select onChange={(e) => setNewGenre(e.target.value)} id="genre">
            <option value="">Select Genre...</option>
            <option value="novel">Novel</option>
            <option value="fiction">Fiction</option>
            <option value="Documentary">Documentary</option>
            <option value="sf">Science Fiction</option>
            <option value="know-how">Know How</option>
            <option value="Others">Others</option>
          </select>
          <input
            placeholder="EN or JP"
            onChange={(e) => setNewLang(e.target.value)}
            type="text"
          />
          <input
            placeholder="Pages"
            onChange={(e) => setNewPages(Number(e.target.value))}
            type="number"
          />

          <input
            placeholder="Format"
            onChange={(e) => setNewFormat(e.target.value)}
            type="text"
          />
          <input
            placeholder="Status"
            onChange={(e) => setNewStatus(e.target.value)}
            type="text"
          />
          <input
            placeholder="Review 1-5"
            onChange={(e) => setNewReview(Number(e.target.value))}
            type="number"
          />
          <textarea
            placeholder="Your sentiment"
            onChange={(e) => setNewSentiment(e.target.value)}
            type="text"
          />
          <div>
            <input
              type="submit"
              value="Submit this book"
              name="Submit"
              className="new-submit-button"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
