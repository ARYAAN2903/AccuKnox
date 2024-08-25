import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWidget, removeWidget, updateWidget, setCategories } from '../features/WidgetsSlice';
import Category from './Category';
import OffcanvasRight from './OffcanvasRight';
import data from '../data/data.json';
import { Button } from 'react-bootstrap';

const Dashboard = () => {
  const dispatch = useDispatch(); // Initialize the dispatch function from Redux

  // Select categories from the Redux store, defaulting to an empty array if undefined
  const categories = useSelector(state => state.widgets?.categories || []);

  // State to manage the visibility of the offcanvas
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  // useEffect hook to set categories from the data.json file when the component mounts
  useEffect(() => {
    dispatch(setCategories(data.categories));
  }, [dispatch]); // Dependency array includes dispatch to avoid unnecessary re-renders

  // Function to show the offcanvas
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  // Function to close the offcanvas
  const handleCloseOffcanvas = () => setShowOffcanvas(false);

  return (
    <div className="dashboard">
      {/* Header section of the dashboard */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">CNAPP Dashboard</h1>
        {/* Button to show the offcanvas for managing widgets */}
        <Button variant="primary" onClick={handleShowOffcanvas}>
          Add/Manage Widgets
        </Button>
      </div>

      {/* Rendering the categories */}
      <div>
        {categories.map(category => (
          <Category
            key={category.id} // Unique key for each category
            category={category} // Passing category data as a prop
            removeWidget={(widgetId) => dispatch(removeWidget({ categoryId: category.id, widgetId }))} // Passing the remove widget handler
          />
        ))}
      </div>

      {/* Offcanvas component for adding or managing widgets */}
      <OffcanvasRight
        show={showOffcanvas} // Control the visibility of the offcanvas
        handleClose={handleCloseOffcanvas} // Pass the close handler
        addWidget={(categoryId, widget) => dispatch(addWidget({ categoryId, widget }))} // Pass the add widget handler
        updateWidget={(categoryId, widgetId, updatedWidget) => dispatch(updateWidget({ categoryId, widgetId, updatedWidget }))} // Pass the update widget handler
        categories={categories} // Pass the categories data as a prop
      />
    </div>
  );
};

export default Dashboard;
