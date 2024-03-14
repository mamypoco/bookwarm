import "./Edit.scss";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import Swal from "sweetalert2";

const Edit = ({
  bookList,
  selectedBook,
  setBookList,
  setIsEditing,
  getBookList,
}) => {
  const id = selectedBook.id;

  const [date, setDate] = useState(selectedBook.date);
  const [title, setTitle] = useState(selectedBook.title);
  const [author, setAuthor] = useState(selectedBook.author);
  //   const [genre, setGenre] = useState(selectedBook.genre);
  const [lang, setLang] = useState(selectedBook.lang);
  const [pages, setPages] = useState(selectedBook.pages);
  const [format, setFormat] = useState(selectedBook.format);
  const [status, setStatus] = useState(selectedBook.status);
  const [review, setReview] = useState(selectedBook.review);
  const [sentiment, setSentiment] = useState(selectedBook.sentiment);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const book = {
      id,
      date,
      title,
      author,
      // genre,
      lang,
      pages,
      format,
      status,
      review,
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
    <div className="add-container">
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
        {/* <select onChange={(e) => setGenre(e.target.value)} id="genre">
          <option value="">Select Genre...</option>
          <option value="novel">Novel</option>
          <option value="fiction">Fiction</option>
          <option value="Documentary">Documentary</option>
          <option value="sf">Science Fiction</option>
          <option value="know-how">Know How</option>
          <option value="Others">Others</option>
        </select> */}
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
          placeholder="Format"
          onChange={(e) => setFormat(e.target.value)}
          type="text"
          value={format}
        />
        <input
          placeholder="Status"
          onChange={(e) => setStatus(e.target.value)}
          type="text"
          value={status}
        />
        <input
          placeholder="Review 1-5"
          onChange={(e) => setReview(e.target.value)}
          type="text"
          value={review}
        />
        <textarea
          placeholder="Your sentiment"
          onChange={(e) => setSentiment(e.target.value)}
          type="text"
          value={sentiment}
        />
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
