import { configureStore } from '@reduxjs/toolkit';
import widgetsReducer from '../features/WidgetsSlice';

// Create and configure the Redux store
const store = configureStore({
  reducer: {
    // Register the widgets reducer under the key 'widgets' in the global state
    widgets: widgetsReducer
  }
});

// Export the store to be used in your application
export default store;
