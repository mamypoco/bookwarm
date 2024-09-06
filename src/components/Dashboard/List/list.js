import "./list.scss";
import { useState, useRef, useEffect } from "react";
import Loading from "../../Loading/loading";
import commentIcon from "../../../assets/icons/insta-comment.svg";
import Rating from "../../Rating/rating";

const List = ({ bookList, handleDelete, handleEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false); //to expand the comment line
  const [isOverflowing, setIsOverflowing] = useState(false); //to check if the height is overflowing
  const commentRef = useRef(null);

  //checks if the total height of the content (scrollHeight) is greater than the visible height (clientHeight). If so, set the content is overflowing (not all is visible).
  useEffect(() => {
    const element = commentRef.current;
    if (element && element.scrollHeight > element.clientHeight) {
      setIsOverflowing(true);
    }
  }, []);

  //function to expand the comment.
  const toggleExpansion = () => {
    if (isOverflowing) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="list-container">
      {bookList ? (
        bookList.map((book, key) => (
          <div key={book.id} className="book-card">
            <div className="title-author">
              {book.title} by {book.author}
            </div>

            <div className="rating-info-container">
              <Rating rating={book.rating} readOnly={true} />
              <p className="content-info">
                {book.status === "reading" ? "I'm " : "I have "}
                {book.status} {book.pages} page {book.lang} {book.format} (
                {book.genre}) as of {book.date}
              </p>
            </div>

            <div className="comment-container">
              <img className="comment-icon" src={commentIcon} alt="comment" />
              <div
                onClick={toggleExpansion}
                style={{ cursor: isOverflowing ? "pointer" : "default" }}
              >
                <p
                  ref={commentRef}
                  className={isExpanded ? "" : "comment-info"}
                  style={{ marginBottom: "0" }}
                >
                  {book.sentiment}
                </p>
                {/* {isOverflowing && !isExpanded && (
                  <span>....</span> // Optional: Only show ellipsis separately if needed
                )} */}
              </div>
            </div>

            <div className="list-action-buttons">
              <button
                className="edit-button"
                onClick={() => handleEdit(book.id)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(book.id)}
              >
                Delete
              </button>
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
