import './cardmodal.scss';
import Rating from '../../components/Rating/rating';

const CardModal = ({ book, onClose, openEditScreen }) => {
  if (!book) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>
          {book.title} <span className="regular-style">by</span> {book.author}
        </h2>
        <Rating rating={book.rating} readOnly={true} />
        <p>
          {book.pages} pages | {book.lang} | {book.format}
        </p>
        <p>Genre: {book.genre}</p>
        <p>
          {book.status} as of {book.date}
        </p>
        <p>Note: {book.sentiment}</p>
        <button
          className="edit-button2"
          onClick={(e) => {
            e.stopPropagation();
            openEditScreen(book.id);
          }}
        >
          Edit
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CardModal;
