import "./BookList.scss";

export const BookList = ({ bookList }) => {
  return (
    <div>
      <h2>Your book list:</h2>
      {bookList.map((book) => (
        <div key={book.id} className="book-card">
          <div className="title-author">
            <div className="title">{book.title}</div>
            <div className="author">by {book.author}</div>
            <div>💬 {book.sentiment}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
