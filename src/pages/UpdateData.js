import data from './data.json'; // Import the existing data

// Function to update a widget in a category
export const updateWidget = (categoryId, widgetId, updatedWidget) => {
  // Find the category
  const category = data.categories.find(cat => cat.id === categoryId);

  if (category) {
    // Find the widget within the category
    const widgetIndex = category.widgets.findIndex(widget => widget.id === widgetId);

    if (widgetIndex !== -1) {
      // Update the widget
      category.widgets[widgetIndex] = { ...category.widgets[widgetIndex], ...updatedWidget };
    }
  }

  // Return the updated data
  return data;
};
