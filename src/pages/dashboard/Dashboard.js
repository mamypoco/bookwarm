import "./Dashboard.scss";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AddBook } from "../../components/addBook/AddBook";
import { BookList } from "../../components/bookList/BookList";

export const Dashboard = () => {
  const [bookList, setBookList] = useState([]);

  const booksCollectionRef = collection(db, "books");

  const getBookList = async () => {
    try {
      const data = await getDocs(booksCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBookList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBookList(); //call the function
  }, []);

  return (
    <div>
      <h1>Your Dashboard...</h1>
      <AddBook getBookList={getBookList} />
      <BookList bookList={bookList} />
    </div>
  );
};
