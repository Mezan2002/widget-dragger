import { WIDGET_ACTIONS } from "@/constants/widgetTypes";

/**
 * Widget Reducer - Central State Management
 *
 * STATE MANAGEMENT APPROACH:
 * This reducer implements the Redux-like pattern using React's useReducer.
 * Benefits:
 * 1. PREDICTABLE: All state changes go through this single function
 * 2. IMMUTABLE: Never mutate state directly, always return new objects
 * 3. TESTABLE: Pure function makes testing easy
 * 4. DEBUGGABLE: Can log all actions and state changes
 * 5. SCALABLE: Easy to add new action types without changing existing code
 *
 * @param {Array} state - Current array of widgets
 * @param {Object} action - Action object with type and payload
 * @returns {Array} New state array
 */
export function widgetReducer(state, action) {
  switch (action.type) {
    // ADD_WIDGET: Appends a new widget to the end of the array
    // IMMUTABILITY: Uses spread operator to create new array
    case WIDGET_ACTIONS.ADD_WIDGET:
      return [...state, action.payload];

    // REMOVE_WIDGET: Filters out the widget with matching ID
    // IMMUTABILITY: filter() creates a new array, doesn't mutate original
    case WIDGET_ACTIONS.REMOVE_WIDGET:
      return state.filter((widget) => widget.id !== action.payload);

    // REORDER_WIDGETS: Implements drag-and-drop reordering
    // ALGORITHM: Remove from source index, insert at destination index
    // IMMUTABILITY: Creates new array, splices don't affect original state
    case WIDGET_ACTIONS.REORDER_WIDGETS: {
      const { fromIndex, toIndex } = action.payload;
      const newState = [...state]; // Create shallow copy
      const [removed] = newState.splice(fromIndex, 1); // Remove from original position
      newState.splice(toIndex, 0, removed); // Insert at new position
      return newState;
    }

    // UPDATE_WIDGET_DATA: Updates widget data after successful API fetch
    // IMMUTABILITY: map() creates new array; spread operators create new objects
    // ARCHITECTURE: Clears loading and error states upon successful update
    case WIDGET_ACTIONS.UPDATE_WIDGET_DATA:
      return state.map(
        (widget) =>
          widget.id === action.payload.id
            ? {
                ...widget, // Keep all existing properties
                data: action.payload.data, // Update data
                loading: false, // Clear loading state
                error: null, // Clear any previous errors
              }
            : widget // Return unchanged widgets as-is
      );

    // SET_WIDGET_LOADING: Toggles loading state for a specific widget
    // Used when starting/stopping data fetch operations
    case WIDGET_ACTIONS.SET_WIDGET_LOADING:
      return state.map((widget) =>
        widget.id === action.payload.id
          ? { ...widget, loading: action.payload.loading }
          : widget
      );

    // SET_WIDGET_ERROR: Sets error state when API fetch fails
    // ARCHITECTURE: Automatically clears loading state on error
    case WIDGET_ACTIONS.SET_WIDGET_ERROR:
      return state.map((widget) =>
        widget.id === action.payload.id
          ? { ...widget, error: action.payload.error, loading: false }
          : widget
      );

    // DEFAULT: Return state unchanged for unknown actions
    // Prevents crashes and makes reducer more resilient
    default:
      return state;
  }
}
