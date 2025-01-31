import './edit.scss';
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import Swal from 'sweetalert2';
import Rating from '../../Rating/rating';
import Modal from '../../Modal/Modal';

const Edit = ({
  userId,
  bookList,
  selectedBook,
  setBookList,
  setIsEditing,
  fetchBooks,
  openCardModal,
  isPreviouslyCard,
  setIsPreviouslyCard,
  book,
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
  const [rating, setRating] = useState(selectedBook.rating);
  const [sentiment, setSentiment] = useState(selectedBook.sentiment);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedBook = {
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

    await setDoc(doc(db, `users/${userId}/booksCollection`, id), {
      ...updatedBook,
    });

    setBookList((prevBookList) =>
      prevBookList.map((book) => (book.id === id ? updatedBook : book))
    );

    setIsEditing(false);
    fetchBooks(userId);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${updatedBook.title} by ${updatedBook.author} has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  //TO DO: open cardModal, but how?
  const closeEditScreen = (book) => {
    if (isPreviouslyCard) {
      setIsPreviouslyCard(false);
      if (book) {
        openCardModal(book);
      }
    }
    setIsEditing(false);
  };

  return (
    <Modal
      title="Edit your book"
      onClose={() => closeEditScreen(book)}
      onSubmit={handleUpdate}
      submitText="Update"
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
          <Rating rating={rating} setRating={setRating} />
        </div>
      </form>
    </Modal>
  );
};

export default Edit;
