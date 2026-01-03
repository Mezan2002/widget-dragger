# Extending the Widget Dragger App

This guide shows how easy it is to add new widget types to the application, demonstrating the extensibility and scalability of the codebase.

---

## Example: Adding a Calendar Widget

Let's walk through adding a new "Calendar" widget type that displays upcoming events.

### Step 1: Add Widget Type Configuration

**File**: `src/constants/widgetTypes.js`

Add the new widget type to the `WIDGET_TYPES` object:

```javascript
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
  // ✨ NEW: Add Calendar widget
  CALENDAR: {
    id: "calendar",
    name: "Calendar",
    color: "bg-yellow-500",
    icon: "📅",
    description: "Upcoming events",
  },
};
```

### Step 2: Add Data Fetching Logic

**File**: `src/services/widgetService.js`

Add a case for the calendar widget in the `fetchWidgetData` function:

```javascript
export const widgetService = {
  fetchWidgetData: async (widgetType) => {
    // Simulate network delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 500)
    );

    // Simulate occasional errors (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Network error occurred");
    }

    switch (widgetType) {
      case "weather":
      // ... existing code ...

      case "stock":
      // ... existing code ...

      case "news":
      // ... existing code ...

      // ✨ NEW: Add calendar data fetching
      case "calendar":
        return {
          value: `${Math.floor(Math.random() * 10 + 1)} events`,
          nextEvent: [
            "Team meeting at 2PM",
            "Lunch with client at 12PM",
            "Project deadline tomorrow",
            "Conference call at 4PM",
          ][Math.floor(Math.random() * 4)],
          date: new Date().toLocaleDateString(),
          updated: "Just now",
        };

      default:
        throw new Error("Unknown widget type");
    }
  },
};
```

### Step 3: That's It! 🎉

No other changes needed! The Calendar widget will now:

- ✅ Appear as a button in the dashboard
- ✅ Use the yellow color and calendar icon
- ✅ Fetch data when added
- ✅ Support drag and drop reordering
- ✅ Have caching (5-minute TTL)
- ✅ Have debounced refresh
- ✅ Show loading and error states

### Why This Works

The application is **configuration-driven**:

1. **Dashboard** component loops through `WIDGET_TYPES` to create buttons
2. **Widget** component uses `widgetConfig` to display icon and name
3. **widgetService** fetches data based on widget type
4. **No hardcoded widget types** in the UI layer

---

## Customizing Widget Display

Want to display calendar data differently? The `Widget` component already handles it!

The widget automatically displays any data fields you return:

```javascript
// Your data structure
{
  value: "5 events",        // Displayed as main value
  nextEvent: "Meeting...",  // Displayed if present
  date: "1/3/2026",        // Displayed if present
  updated: "Just now"       // Displayed if present
}
```

**Want custom rendering?** You can modify the `Widget.jsx` component to handle specific widget types:

```javascript
// In Widget.jsx
{widget.type === 'calendar' && widget.data ? (
  <div className="space-y-2">
    <div className="text-3xl font-bold">{widget.data.value}</div>
    <div className="text-sm text-gray-600">{widget.data.nextEvent}</div>
    <div className="text-xs text-gray-400">{widget.data.date}</div>
  </div>
) : (
  // Default rendering
  // ...
)}
```

---

## Adding Real API Integration

To fetch real data instead of mock data:

### 1. Update the Service

**File**: `src/services/widgetService.js`

```javascript
case "calendar":
  // Replace mock data with real API call
  const response = await fetch(
    "https://api.example.com/calendar/events",
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  const events = await response.json();

  return {
    value: `${events.length} events`,
    nextEvent: events[0]?.title,
    date: new Date().toLocaleDateString(),
    updated: "Just now",
  };
```

### 2. Add Environment Variables

Create `.env` file:

```bash
VITE_CALENDAR_API_KEY=your_api_key_here
```

Access in code:

```javascript
const API_KEY = import.meta.env.VITE_CALENDAR_API_KEY;
```

---

## Advanced: Adding Widget Settings

Want users to customize widgets? Add a settings mechanism:

### 1. Update Widget State Structure

```javascript
const newWidget = {
  id: generateWidgetId(),
  type: type.toLowerCase(),
  data: null,
  loading: false,
  error: null,
  createdAt: Date.now(),
  // ✨ NEW: Add settings
  settings: {
    refreshInterval: 300000, // 5 minutes
    theme: "light",
    // Add more settings...
  },
};
```

### 2. Add Settings UI

Create a settings modal that dispatches an `UPDATE_WIDGET_SETTINGS` action.

### 3. Update Reducer

```javascript
case WIDGET_ACTIONS.UPDATE_WIDGET_SETTINGS:
  return state.map((widget) =>
    widget.id === action.payload.id
      ? { ...widget, settings: action.payload.settings }
      : widget
  );
```

---

## Testing Your New Widget

### Manual Testing Checklist

- [ ] Button appears in dashboard with correct icon and color
- [ ] Clicking button adds widget to grid
- [ ] Widget displays loading state initially
- [ ] Widget displays data after loading
- [ ] Refresh button updates data
- [ ] Clicking refresh multiple times only makes one API call (debouncing)
- [ ] Refreshing within 5 minutes uses cached data
- [ ] Widget can be dragged and reordered
- [ ] Widget can be removed
- [ ] Error state displays if API fails

### Unit Test Example

```javascript
// widgetService.test.js
test("Calendar widget returns valid data", async () => {
  const data = await widgetService.fetchWidgetData("calendar");

  expect(data).toHaveProperty("value");
  expect(data).toHaveProperty("nextEvent");
  expect(data).toHaveProperty("date");
  expect(data.value).toMatch(/\d+ events?/);
});
```

---

## More Extension Ideas

### 1. Weather Widget with Location

```javascript
WEATHER: {
  id: "weather",
  name: "Weather",
  color: "bg-blue-500",
  icon: "🌤️",
  description: "Current weather conditions",
  // Add default settings
  defaultSettings: {
    location: "New York",
    units: "celsius",
  },
}
```

### 2. Crypto Price Widget

```javascript
CRYPTO: {
  id: "crypto",
  name: "Crypto Prices",
  color: "bg-orange-500",
  icon: "₿",
  description: "Cryptocurrency prices",
}
```

### 3. Todo List Widget

```javascript
TODO: {
  id: "todo",
  name: "Todo List",
  color: "bg-pink-500",
  icon: "✓",
  description: "Your tasks",
}
```

---

## Conclusion

The architecture makes it incredibly easy to extend the application:

- **2 files to edit** to add a basic widget
- **No component changes** needed
- **Automatic features**: caching, debouncing, drag-drop
- **Real APIs**: Easy to integrate
- **Custom rendering**: Straightforward to add

This demonstrates the **scalability** and **extensibility** of the codebase! 🚀
