import { useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import Header from "./Header";
import List from "./List";
import Add from "./Add";
import "./Dashboard.scss";
import Swal from "sweetalert2";

const Dashboard = ({ setIsAuthenticated }) => {
  const [bookList, setBookList] = useState();
  const [isAdding, setIsAdding] = useState(false);

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
      {!isAdding && (
        <div>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <List bookList={bookList} handleDelete={handleDelete} />
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
    </div>
  );
};

export default Dashboard;
