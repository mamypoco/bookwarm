import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import Header from "./Header";
import List from "./List";
import Add from "./Add";

const Dashboard = ({ setIsAuthenticated }) => {
  const [bookList, setBookList] = useState();
  const [isAdding, setIsAdding] = useState(false);

  //getDocs
  const getBookList = async () => {
    const booksCollectionRef = collection(db, "books");
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

  return (
    <div className="dashboard-container">
      {!isAdding && (
        <div>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <List bookList={bookList} />
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
