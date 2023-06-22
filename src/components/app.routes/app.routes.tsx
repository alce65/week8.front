import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../login/login';
import { Register } from '../register/register';
import { Home } from '../home/home';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

// const Home = lazy(() => import("../home/home"));
// const ToDo = lazy(() => import("../todo/todo"));
// const Notes = lazy(() => import("../notes/notes"));
// const NotesDetail = lazy(() => import("../notes.detail/notes.detail"));
const BooksPage = lazy(() => import('../books/books'));
// const BooksDetail = lazy(() => import("../books.detail/books.details"));

export function AppRoutes() {
  const { token } = useSelector((state: RootState) => state.user);

  return (
    <Suspense>
      <Routes>
        <Route path="" element={<Home></Home>}></Route>
        <Route path="home" element={<Home></Home>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        {token ? (
          <Route path="books" element={<BooksPage></BooksPage>}></Route>
        ) : (
          <Route
            path="books"
            element={<Navigate to={'/login'}></Navigate>}
          ></Route>
        )}
      </Routes>
    </Suspense>
  );
}
