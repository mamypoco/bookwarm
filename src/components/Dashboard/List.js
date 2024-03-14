import "./List.scss";

const List = ({ bookList, handleDelete, handleEdit }) => {
  return (
    <div>
      <h2>Your book list:</h2>

      {bookList ? (
        bookList.map((book, key) => (
          <div key={book.id} className="book-card">
            <div className="title-author-review">
              <div className="title">
                {book.title} by {book.author}
              </div>
              <div>{book.review}</div>
            </div>
            <div className="grid-container">
              <div className="left-content">
                <p>💬 {book.sentiment}</p>
              </div>
              <div className="right-content">
                <p>
                  {book.status} {book.pages} pages {book.lang} {book.format} on{" "}
                  {book.date}
                </p>
              </div>
              <div className="action-buttons">
                <button onClick={() => handleEdit(book.id)}>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default List;
