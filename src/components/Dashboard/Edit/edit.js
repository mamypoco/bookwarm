import "./edit.scss";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import Swal from "sweetalert2";
import Rating from "../../Rating/rating";

const Edit = ({
  bookList,
  selectedBook,
  setBookList,
  setIsEditing,
  getBookList,
  rating,
  setRating,
}) => {
  const id = selectedBook.id;

  const [date, setDate] = useState(selectedBook.date);
  const [title, setTitle] = useState(selectedBook.title);
  const [author, setAuthor] = useState(selectedBook.author);
  const [genre, setGenre] = useState(selectedBook.genre);
  const [lang, setLang] = useState(selectedBook.lang);
  const [pages, setPages] = useState(selectedBook.pages);
  const [format, setFormat] = useState(selectedBook.format);
  const [status, setStatus] = useState(selectedBook.status);
  //   const [rating, setRating] = useState(selectedBook.rating);
  const [sentiment, setSentiment] = useState(selectedBook.sentiment);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const book = {
      id,
      date,
      title,
      author,
      genre,
      lang,
      pages,
      format,
      status,
      rating,
      sentiment,
    };

    await setDoc(doc(db, "books", id), {
      ...book,
    });

    setBookList(bookList);
    setIsEditing(false);
    getBookList();

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `${book.title} by ${book.author} has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="edit-container">
      <form className="add-form" onSubmit={handleUpdate}>
        <h1>Edit Your Book</h1>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Author"
          onChange={(e) => setAuthor(e.target.value)}
          type="text"
          value={author}
        />
        <select
          placeholder="Select Genre"
          onChange={(e) => setGenre(e.target.value)}
          id="genre"
          value={genre}
        >
          <option value="">Select Genre...</option>
          <option value="novel">Novel</option>
          <option value="non-fiction">Non-fiction</option>
          <option value="mystery">Mystery</option>
          <option value="science-fiction">Science Fiction</option>
          <option value="fantasy">Fantasy</option>
          <option value="know-how">Know-how</option>
          <option value="manga">Manga</option>
          <option value="Others">Others</option>
        </select>

        <input
          placeholder="EN or JP"
          onChange={(e) => setLang(e.target.value)}
          type="text"
          value={lang}
        />
        <input
          placeholder="Pages"
          onChange={(e) => setPages(e.target.value)}
          type="text"
          value={pages}
        />

        <input
          placeholder="Format: book, ebook, or audiobook"
          onChange={(e) => setFormat(e.target.value)}
          type="text"
          value={format}
        />
        <input
          placeholder="Status: read or reading"
          onChange={(e) => setStatus(e.target.value)}
          type="text"
          value={status}
        />
        {/* <input
          placeholder="Review: 1-5 stars"
          onChange={(e) => setRating(e.target.value)}
          type="text"
          value={rating}
        /> */}
        <textarea
          placeholder="Your sentiment"
          onChange={(e) => setSentiment(e.target.value)}
          type="text"
          rows={7}
          value={sentiment}
        />
        <div className="rating-container">
          <p>Your rating:</p>
          <Rating
            rating={rating}
            setRating={setRating}
            currentRating={rating}
            handleOnChange={(e) => setRating(Number(e.target.value))}
          />
        </div>
        <div className="add-cancel-buttons">
          <input
            className="add-button"
            type="submit"
            value="Update"
            name="Submit"
          />
          <input
            className="cancel-button"
            type="button"
            value="Cancel"
            name="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
