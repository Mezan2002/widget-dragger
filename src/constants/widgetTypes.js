export const WIDGET_TYPES = {
  WEATHER: {
    id: "weather",
    name: "Weather",
    color: "bg-blue-500",
    icon: "🌤️",
    description: "Current weather conditions",
  },
  STOCK: {
    id: "stock",
    name: "Stock Price",
    color: "bg-green-500",
    icon: "📈",
    description: "Real-time stock prices",
  },
  NEWS: {
    id: "news",
    name: "News Feed",
    color: "bg-purple-500",
    icon: "📰",
    description: "Latest news articles",
  },
};

export const WIDGET_ACTIONS = {
  ADD_WIDGET: "ADD_WIDGET",
  REMOVE_WIDGET: "REMOVE_WIDGET",
  REORDER_WIDGETS: "REORDER_WIDGETS",
  UPDATE_WIDGET_DATA: "UPDATE_WIDGET_DATA",
  SET_WIDGET_LOADING: "SET_WIDGET_LOADING",
  SET_WIDGET_ERROR: "SET_WIDGET_ERROR",
};
