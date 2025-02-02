import './dashboard.scss';
import { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { auth } from '../../config/firebase';

import Header from './Header/header';
import List from './List/list';
import Add from './Add/add';
import Edit from './Edit/edit';
import Swal from 'sweetalert2';

const Dashboard = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [bookList, setBookList] = useState();
  const [selectedBook, setSelectedBook] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(null);
  const [isCardModalActive, setIsCardModalActive] = useState(false); //moved state up for header to set conditional css
  const [isPreviouslyCard, setIsPreviouslyCard] = useState(false);

  //   const openCardModal = () => setIsCardModalActive(true);
  //   const closeCardModal = () => setIsCardModalActive(false);

  const openEditScreen = (id) => {
    if (isCardModalActive) {
      setIsCardModalActive(false);
      setIsPreviouslyCard(true);
    }
    const [book] = bookList.filter((book) => book.id === id);
    setSelectedBook(book);
    setIsEditing(true);
  };

  //   const closeEditScreen = () => {
  //     if (isPreviouslyCard) {
  //       openCardModal();
  //     }
  //     setIsEditing(false);
  //   };

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
      console.error('Error fetching books: ', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        if (user.displayName) {
          setUserName(user.displayName.split(' ')[0]);
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

  const handleDelete = async (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "you won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const [book] = bookList.filter((book) => book.id === id);
          deleteDoc(doc(db, `users/${user.uid}/booksCollection`, id));

          Swal.fire({
            icon: 'Success',
            title: 'Deleted!',
            text: `${book.title} by ${book.author} is deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });

          const bookCopy = bookList.filter((book) => book.id !== id);
          setBookList(bookCopy);
        } catch (error) {
          console.error('Error deleting book: ', error);
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'There was a problem deleting the book.',
            showConfirmButton: true,
          });
        }
      }
    });
  };

  return (
    <div className="dashboard-container">
      {!isAdding && !isEditing && (
        <div>
          <div className="header-section">
            <Header
              userName={userName}
              setIsAdding={setIsAdding}
              setIsAuthenticated={setIsAuthenticated}
              isCardModalActive={isCardModalActive}
            />
          </div>
          <div className="list-section">
            <List
              bookList={bookList}
              openEditScreen={openEditScreen}
              handleDelete={handleDelete}
              //   openCardModal={openCardModal}
              //   closeCardModal={closeCardModal}
              isCardModalActive={isCardModalActive}
              setIsCardModalActive={setIsCardModalActive}
              isPreviouslyCard={isPreviouslyCard}
              setIsPreviouslyCard={setIsPreviouslyCard}
            />
          </div>
        </div>
      )}

      {isAdding && (
        <Add
          setIsAdding={setIsAdding}
          bookList={bookList}
          setBookList={setBookList}
          fetchBooks={fetchBooks}
          rating={rating}
          setRating={setRating}
        />
      )}
      {isEditing && (
        <Edit
          userId={user?.uid}
          bookList={bookList}
          fetchBooks={fetchBooks}
          selectedBook={selectedBook}
          setBookList={setBookList}
          setIsEditing={setIsEditing}
          rating={rating}
          setRating={setRating}
          //  closeModal={closeCardModal}
          isCardModalActive={isCardModalActive}
          openEditScreen={openEditScreen}
          //  closeEditScreen={closeEditScreen}
        />
      )}
    </div>
  );
};

export default Dashboard;
