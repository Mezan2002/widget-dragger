export const widgetService = {
  // Fetch widget data based on type
  fetchWidgetData: async (widgetType) => {
    // Simulate network delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 500)
    );

    // Simulate occasional errors (10% chance)
    if (Math.random() < 0.1) {
      throw new Error("Network error occurred");
    }

    // Generate mock data
    switch (widgetType) {
      case "weather":
        return {
          value: `${Math.floor(Math.random() * 20 + 10)}°C`,
          location: ["New York", "London", "Tokyo", "Paris"][
            Math.floor(Math.random() * 4)
          ],
          condition: ["Sunny", "Cloudy", "Rainy"][
            Math.floor(Math.random() * 3)
          ],
        };

      case "stock": {
        const price = (Math.random() * 1000 + 100).toFixed(2);
        const change = (Math.random() * 10 - 5).toFixed(2);
        return {
          value: `$${price}`,
          change: `${change > 0 ? "+" : ""}${change}%`,
          symbol: ["AAPL", "GOOGL", "MSFT", "AMZN"][
            Math.floor(Math.random() * 4)
          ],
        };
      }

      case "news":
        return {
          value: `${Math.floor(Math.random() * 50 + 10)} articles`,
          trending: ["Tech News", "World News", "Business", "Sports"][
            Math.floor(Math.random() * 4)
          ],
          updated: "Just now",
        };

      case "tasks":
        return {
          items: [
            { id: 1, text: "Review dashboard", completed: false },
            { id: 2, text: "Add new widgets", completed: false },
            { id: 3, text: "Test drag & drop", completed: false },
          ],
        };

      case "stats":
        return {
          stats: [
            {
              label: "Total Users",
              value: "2,847",
              icon: "Users",
              color: "text-blue-500",
            },
            {
              label: "Growth",
              value: "+12.5%",
              icon: "TrendingUp",
              color: "text-green-500",
            },
            {
              label: "Active Now",
              value: "342",
              icon: "Activity",
              color: "text-purple-500",
            },
          ],
        };

      case "notes":
        return {
          text: "• Meeting with team at 2 PM\n• Review project requirements\n• Update documentation",
        };

      default:
        throw new Error("Unknown widget type");
    }
  },
};
