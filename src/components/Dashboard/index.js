import "./index.scss";
import { useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

import Header from "./Header/header";
import List from "./List/list";
import Add from "./Add/add";
import Edit from "./Edit/edit";
import Swal from "sweetalert2";

const Dashboard = ({ setIsAuthenticated }) => {
  const [bookList, setBookList] = useState();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const booksCollectionRef = collection(db, "books");
  //getDocs
  const getBookList = async () => {
    try {
      const data = await getDocs(booksCollectionRef);
      const allbooks = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBookList(allbooks);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBookList(); //call the function
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
          getBookList={getBookList}
        />
      )}
      {isEditing && (
        <Edit
          bookList={bookList}
          getBookList={getBookList}
          selectedBook={selectedBook}
          setBookList={setBookList}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
