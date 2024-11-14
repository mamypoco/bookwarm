import './list.scss';
import { useState, useRef, useEffect } from 'react';
import Loading from '../../Loading/loading';
import commentIcon from '../../../assets/images/quote.png';
import Rating from '../../Rating/rating';
import BookModal from '../../BookModal/bookmodal';

const List = ({ bookList, handleDelete, handleEdit }) => {
  const [isOverflowing, setIsOverflowing] = useState(false); //to check if the height is overflowing
  const [isCardModalActive, setIsCardModalActive] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // state for selected book
  const commentRef = useRef(null);

  //checks if the total height of the content (scrollHeight) is greater than the visible height (clientHeight). If so, set the content is overflowing (not all is visible).
  useEffect(() => {
    const element = commentRef.current;
    if (element && element.scrollHeight > element.clientHeight) {
      setIsOverflowing(true);
    }
  }, []);

  const openCardModal = (book) => {
    setIsCardModalActive(true);
    setSelectedBook(book);
  };

  const closeCardModal = () => {
    setIsCardModalActive(false);
    setSelectedBook(null);
  };

  return (
    <div className="list-container">
      {bookList && bookList.length > 0 ? (
        bookList.map((book) => (
          <div
            key={book.id}
            className="book-card"
            onClick={() => openCardModal(book)}
          >
            <div className="title-author">
              {book.title} <span className="regular-style">by</span>{' '}
              {book.author}
            </div>

            <div className="rating-info-container">
              <Rating rating={book.rating} readOnly={true} />
              <p className="content-info">
                {book.pages} page | {book.lang} | {book.format} | {book.genre}
                <br />
                {book.status === 'reading' ? 'Currently reading ' : 'Read '} as
                of {book.date}
              </p>
            </div>

            <div className="comment-container">
              <img className="comment-icon" src={commentIcon} alt="comment" />
              <p className="comment-info">{book.sentiment}</p>
            </div>

            <div className="list-action-buttons">
              <button
                className="edit-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(book.id);
                }}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(book.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}

      {isCardModalActive && selectedBook && (
        <BookModal book={selectedBook} onClose={closeCardModal} />
      )}
    </div>
  );
};

export default List;
