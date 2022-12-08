import { Toaster} from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  const { user } = useSelector(state => state.auth);

  return (
    <>
      <Toaster position='top-right'/>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" replace /> } />
        <Route path='/register' element={!user ? <Register /> : <Navigate to="/" replace /> } />
      </Routes>
    </>
  );
}

export default App;
