import React, { useState } from 'react'; // Import React and useState hook for state management
import { Button, Form } from 'react-bootstrap'; // Import Button and Form components from react-bootstrap

// Define the AddWidgetForm component, which receives props: categoryId and addWidget function
const AddWidgetForm = ({ categoryId, addWidget }) => {
  // Define state variables for widgetName and widgetText using useState hook
  const [widgetName, setWidgetName] = useState(''); // widgetName stores the name of the widget
  const [widgetText, setWidgetText] = useState(''); // widgetText stores the text content of the widget

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const newWidget = { name: widgetName, text: widgetText }; // Create a new widget object with the entered name and text
    addWidget(categoryId, newWidget); // Call the addWidget function, passing the categoryId and new widget object
    setWidgetName(''); // Clear the widgetName input field after submission
    setWidgetText(''); // Clear the widgetText input field after submission
  };

  // Return the JSX that renders the form
  return (
    <Form onSubmit={handleSubmit}> {/* Form element with an onSubmit handler */}
      <Form.Group className="mb-3"> {/* Form group for the widget name input */}
        <Form.Label>Widget Name</Form.Label> {/* Label for the widget name input */}
        <Form.Control
          type="text" // Input type is text
          value={widgetName} // Bind input value to widgetName state
          onChange={(e) => setWidgetName(e.target.value)} // Update widgetName state when input value changes
        />
      </Form.Group>
      <Form.Group className="mb-3"> {/* Form group for the widget text input */}
        <Form.Label>Widget Text</Form.Label> {/* Label for the widget text input */}
        <Form.Control
          as="textarea" // Input type is a textarea
          rows={3} // Textarea has 3 rows by default
          value={widgetText} // Bind textarea value to widgetText state
          onChange={(e) => setWidgetText(e.target.value)} // Update widgetText state when input value changes
        />
      </Form.Group>
      <Button type="submit" variant="primary">Add Widget</Button> {/* Submit button to add the widget */}
    </Form>
  );
};

export default AddWidgetForm; // Export the component for use in other parts of the application
