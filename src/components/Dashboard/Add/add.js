import "./add.scss";
import { useState } from "react";
import { db, auth } from "../../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import Rating from "../../Rating/rating";
import Modal from "../../Modal/Modal";

const Add = ({
  bookList,
  setBookList,
  setIsAdding,
  fetchBooks,
  rating,
  setRating,
}) => {
  //add new book
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [lang, setLang] = useState("");
  const [pages, setPages] = useState("");
  const [format, setFormat] = useState("");
  const [status, setStatus] = useState("");
  //   const [rating, setRating] = useState("");
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
      rating,
      sentiment,
    };

    bookList.push(newBook);

    const user = auth.currentUser;
    if (!user) {
      console.error("user not found");
      return;
    }

    try {
      await addDoc(collection(db, `users/${user.uid}/booksCollection`), {
        ...newBook,
      });
      console.log("document written with ID: ", booksCollectionRef.id, user);

      setBookList(bookList);
      setIsAdding(false);
      fetchBooks(user.uid);
      //  getBookList();
      console.log("rating:", rating);
    } catch (error) {
      console.error("Error adding document:", error);
    }

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `${title} by ${author}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <Modal
      title="Add a new book"
      onClose={() => setIsAdding(false)}
      onSubmit={handleAdd}
      submitText="Add"
    >
      <form className="add-form">
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

        <textarea
          placeholder="Your sentiment"
          onChange={(e) => setSentiment(e.target.value)}
          type="text"
          rows={5}
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
      </form>
    </Modal>
  );
};

export default Add;
