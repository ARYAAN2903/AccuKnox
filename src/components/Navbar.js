import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ 
      backgroundColor: '#003366', 
      color: 'white',
      padding: '15px 20px', // Reduce navbar height
    }}>
      <a className="navbar-brand" href="#" style={{ color: 'white' }}>Home |</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#" style={{ color: 'white' }}>Dashboard<span className="sr-only"></span></a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0 mx-auto d-flex w-50">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ maxWidth: '400px' }} // Limit search bar width
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
