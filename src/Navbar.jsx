import { useEffect } from 'react';
import './navbar.css';
import memojiImage from './assets/images/memoji.png';


function Navbar({ username, setCurrentView }) {

  useEffect(() => {
  }, []);

  // Rendering the navbar
  return (
    <div className="user-details">
      <div className="avatar">
        <img src={memojiImage} alt={`${username}'s avatar`} />
      </div>
      <h2>{username}</h2>
      <nav className="sidebar-navigation">
        <ul>
          <li><button onClick={() => setCurrentView('dashboard')}>Dashboard</button></li>
          <button onClick={() => setCurrentView('transactions')}>Transactions</button>
          <button onClick={() => setCurrentView('aboutus')}>About Us</button>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;