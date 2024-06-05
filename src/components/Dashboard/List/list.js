import "./list.scss";
import Loading from "../../Loading/loading";
import commentIcon from "../../../assets/icons/comment.svg";
import Rating from "../../Rating/rating";

const List = ({ bookList, handleDelete, handleEdit }) => {
  return (
    <div className="list-container">
      {bookList ? (
        bookList.map((book, key) => (
          <div key={book.id} className="book-card">
            <div className="title-author">
              {book.title} by {book.author}
            </div>
            {/* <div>{book.rating}</div> */}
            {/* rating component here */}
            <Rating rating={book.rating} readOnly={true} />

            <div className="grid-container">
              <div className="comment-container">
                <img className="comment-icon" src={commentIcon} alt="comment" />
                <p className="comment-info">{book.sentiment}</p>
              </div>
              <div>
                <p className="content-info">
                  {book.status} {book.pages} pages {book.lang} {book.format} (
                  {book.genre}) on {book.date}
                </p>
              </div>
              <div className="list-action-buttons">
                <button onClick={() => handleEdit(book.id)}>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default List;
