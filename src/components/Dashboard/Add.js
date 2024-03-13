import "./Add.scss";
import { useState } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const Add = ({ bookList, setBookList, setIsAdding, getBookList }) => {
  //add new book
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [lang, setLang] = useState("");
  const [pages, setPages] = useState("");
  const [format, setFormat] = useState("");
  const [status, setStatus] = useState("");
  const [review, setReview] = useState("");
  const [sentiment, setSentiment] = useState("");

  const booksCollectionRef = collection(db, "books");

  const handleAdd = async (e) => {
    e.preventDefault();

    const newBook = {
      date,
      title,
      author,
      genre,
      lang,
      pages,
      format,
      status,
      review,
      sentiment,
    };

    bookList.push(newBook);

    try {
      await addDoc(booksCollectionRef, {
        ...newBook,
      });
      console.log("document written with ID: ", booksCollectionRef.id);
    } catch (err) {
      console.error(err);
    }
    setBookList(bookList);
    setIsAdding(false);
    getBookList();

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `${title} by ${author}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div>
      <h2>Let's add a book</h2>
      <div className="add-container">
        <form className="add-form" onSubmit={handleAdd}>
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
          <select onChange={(e) => setGenre(e.target.value)} id="genre">
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
            onChange={(e) => setLang(e.target.value)}
            type="text"
            value={lang}
          />
          <input
            placeholder="Pages"
            onChange={(e) => setPages(Number(e.target.value))}
            type="number"
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
            onChange={(e) => setReview(Number(e.target.value))}
            type="number"
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
              value="Add"
              name="Submit"
            />
            <input
              className="cancel-button"
              type="button"
              value="Cancel"
              name="Cancel"
              onClick={() => setIsAdding(false)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
