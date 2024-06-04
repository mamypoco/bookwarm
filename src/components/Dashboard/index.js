import "./index.scss";
import { useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";

import Header from "./Header/header";
import List from "./List/list";
import Add from "./Add/add";
import Edit from "./Edit/edit";
import Swal from "sweetalert2";

const Dashboard = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [bookList, setBookList] = useState();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(null); //moved the state up from add, edit and list

  // Fetch user's books
  const fetchBooks = async (userId) => {
    try {
      const userBooksCollectionRef = collection(
        db,
        `users/${userId}/booksCollection`
      );
      const querySnapshot = await getDocs(userBooksCollectionRef);
      const booksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookList(booksData);
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        if (user.displayName) {
          setUserName(user.displayName.split(" ")[0]);
        } else {
          setUserName(user.email);
        }
        fetchBooks(user.uid);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleEdit = (id) => {
    const [book] = bookList.filter((book) => book.id === id);
    setSelectedBook(book);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "you won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.value) {
        const [book] = bookList.filter((book) => book.id === id);
        deleteDoc(doc(db, "books", id));

        Swal.fire({
          icon: "Success",
          title: "Deleted!",
          text: `${book.title} by ${book.author} is deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
        const bookCopy = bookList.filter((book) => book.id !== id);
        setBookList(bookCopy);
      }
    });
  };

  return (
    <div className="dashboard-container">
      {!isAdding && !isEditing && (
        <div>
          <Header
            userName={userName}
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <List
            bookList={bookList}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      )}
      {isAdding && (
        <Add
          setIsAdding={setIsAdding}
          bookList={bookList}
          setBookList={setBookList}
          fetchBooks={fetchBooks}
          //  getBookList={getBookList}
          rating={rating}
          setRating={setRating}
        />
      )}
      {isEditing && (
        <Edit
          userId={user?.uid}
          bookList={bookList}
          fetchBooks={fetchBooks}
          //  getBookList={getBookList}
          selectedBook={selectedBook}
          setBookList={setBookList}
          setIsEditing={setIsEditing}
          rating={rating}
          setRating={setRating}
        />
      )}
    </div>
  );
};

export default Dashboard;
