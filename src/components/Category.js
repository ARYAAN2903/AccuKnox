import React from 'react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../features/categoriesSlice';
import Widget from './Widget';

const Category = ({ category }) => {
  const dispatch = useDispatch();

  // Function to handle the removal of a widget
  const handleRemoveWidget = (widgetId) => {
    // Dispatch the removeWidget action with categoryId and widgetId as payload
    dispatch(removeWidget({ categoryId: category.id, widgetId }));
  };

  return (
    <div className="category">
      {/* Display the category name */}
      <h2>{category.name}</h2>

      {/* Container for widgets */}
      <div className="widget-container">
        {/* Loop through each widget in the category */}
        {category.widgets.map(widget => (
          <div key={widget.id} className="widget-wrapper">
            {/* Render the Widget component and pass the removeWidget handler */}
            <Widget widget={widget} removeWidget={handleRemoveWidget} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
