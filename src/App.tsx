import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { AppDispatch } from './store/store';
import { fetchContactsAsync } from './store/contactsSlice';
import AddContacts from './components/AddContacts/AddContacts';
import ContactsList from './components/ContactsList/ContactsList';

import './App.scss';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchContactsAsync());
  }, [dispatch]);

  return (
      <Router>
        <div>
          <div className='header'>
            <Link to='/' className='header-button'>Contacts</Link>
            <Link to='/add' className='header-button'>Add Contact</Link>
          </div>
          <Routes>
            <Route path='/' element={<ContactsList />} />
            <Route path='/add' element={<AddContacts />} />
          </Routes>
        </div>
     </Router>
  );
}

export default App;