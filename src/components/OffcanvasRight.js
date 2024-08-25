import React, { useState } from 'react';
import { Offcanvas, Nav, Tab, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import AddWidgetForm from './AddWidgetForm';
import { useDispatch } from 'react-redux';
import { updateWidget, addWidget, removeWidget } from '../features/WidgetsSlice';
import '../assets/OffcanvasRight.css';

const OffcanvasRight = ({ show, handleClose, categories }) => {
  // State to manage the active category ID for the currently selected category in the Offcanvas
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id || null);
  
  // State to manage the widget currently being edited
  const [editingWidget, setEditingWidget] = useState(null);

  // State to manage the name and text of the widget being edited or added
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  // State to manage the search term for filtering widgets
  const [searchTerm, setSearchTerm] = useState('');

  // Get the dispatch function from Redux to dispatch actions
  const dispatch = useDispatch();

  // Function to handle when a widget is selected for editing
  const handleEditWidget = (widget) => {
    setEditingWidget(widget);  // Set the widget as the currently editing widget
    setWidgetName(widget.name);  // Populate the form with the widget's name
    setWidgetText(widget.text);  // Populate the form with the widget's text
  };

  // Function to handle updating the currently edited widget
  const handleUpdateWidget = () => {
    if (editingWidget) {
      const updatedWidget = { name: widgetName, text: widgetText };
      dispatch(updateWidget({ categoryId: activeCategoryId, widgetId: editingWidget.id, updatedWidget }));
      setEditingWidget(null);  // Reset the editing state after updating
      setWidgetName('');  // Clear the widget name field
      setWidgetText('');  // Clear the widget text field
    }
  };

  // Function to handle adding a new widget to a category
  const handleAddWidget = (categoryId, widget) => {
    dispatch(addWidget({ categoryId, widget }));
  };

  // Function to handle removing a widget from a category
  const handleRemoveWidget = (widgetId) => {
    dispatch(removeWidget({ categoryId: activeCategoryId, widgetId }));
  };

  // Function to filter widgets based on the search term
  const filteredWidgets = (widgets) => {
    return widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: '400px' }}>
      {/* Offcanvas Header with Title and Close Button */}
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Manage Widgets</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {/* Tab Container for category navigation */}
        <Tab.Container id="left-tabs-example" activeKey={activeCategoryId}>
          <Row>
            <Col sm={12}>
              {/* Navigation pills for categories */}
              <Nav variant="pills" className="category-nav">
                {categories.map(category => (
                  <Nav.Item key={category.id}>
                    <Nav.Link
                      eventKey={category.id}
                      onClick={() => setActiveCategoryId(category.id)}
                    >
                      {category.name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
              <Tab.Content>
                {categories.map(category => (
                  <Tab.Pane eventKey={category.id} key={category.id}>
                    {/* Form to add a new widget */}
                    <div className="mb-3">
                      <AddWidgetForm
                        categoryId={category.id}
                        addWidget={handleAddWidget}
                      />
                    </div>

                    {/* Search bar for filtering widgets */}
                    <Form.Group className="mb-3">
                      <Form.Label>Search Widgets</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Search by name or text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </Form.Group>

                    {/* List of widgets with edit and remove functionality */}
                    <div className="widget-list">
                      <h6>Widget List</h6>
                      <ListGroup>
                        {filteredWidgets(category.widgets).map(widget => (
                          <ListGroup.Item key={widget.id}>
                            <div className="d-flex align-items-center">
                              <span
                                className="uncheck-btn"
                                onClick={() => handleRemoveWidget(widget.id)}
                              >
                                &times;
                              </span>
                              <div className="flex-grow-1 ms-2">
                                <h6>{widget.name}</h6>
                                <p>{widget.text}</p>
                              </div>
                              <Button
                                variant="info"
                                size="sm"
                                onClick={() => handleEditWidget(widget)}
                              >
                                Edit
                              </Button>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </div>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

        {/* Section for editing an existing widget */}
        {editingWidget && (
          <div className="edit-widget-section mt-3">
            <h5>Edit Widget</h5>
            <Form.Group className="mb-3">
              <Form.Label>Widget Name</Form.Label>
              <Form.Control
                type="text"
                value={widgetName}
                onChange={(e) => setWidgetName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Widget Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={widgetText}
                onChange={(e) => setWidgetText(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdateWidget}>
              Update Widget
            </Button>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasRight;
