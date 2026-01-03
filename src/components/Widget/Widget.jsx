import {
  Activity,
  GripVertical,
  RefreshCw,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import { WIDGET_TYPES } from "@/constants";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
} from "@/components/ui";

export function Widget({
  widget,
  onRemove,
  onRefresh,
  dragHandlers,
  isDragging,
}) {
  const widgetConfig = WIDGET_TYPES[widget.type.toUpperCase()];

  const getIcon = (name) => {
    const icons = { Users, TrendingUp, Activity };
    const Icon = icons[name];
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  const renderWidgetContent = () => {
    if (widget.loading) {
      return (
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>
      );
    }

    if (widget.error) {
      return (
        <div className="text-sm text-red-500">
          <p className="font-medium">Error</p>
          <p className="text-xs mt-1">{widget.error}</p>
        </div>
      );
    }

    if (!widget.data) {
      return <div className="text-sm text-gray-500">No data available</div>;
    }

    // Custom rendering based on widget type
    if (widget.type === "tasks") {
      return (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-900">Tasks</h3>
          <div className="space-y-3">
            {widget.data.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox id={`task-${widget.id}-${item.id}`} />
                <label
                  htmlFor={`task-${widget.id}-${item.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                >
                  {item.text}
                </label>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (widget.type === "stats") {
      return (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-900">Stats</h3>
          <div className="grid grid-cols-3 gap-2 pt-2">
            {widget.data.stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center space-y-2"
              >
                <span className={`${stat.color}`}>{getIcon(stat.icon)}</span>
                <span className="text-xl font-bold text-gray-900">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (widget.type === "notes") {
      return (
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-gray-900">Notes</h3>
          <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100 text-sm text-gray-700 whitespace-pre-line min-h-[100px]">
            {widget.data.text}
          </div>
        </div>
      );
    }

    // Default Rendering (Weather, Stock, News)
    return (
      <div className="space-y-3">
        {/* Category Title */}
        <h3 className="text-base font-semibold text-gray-900">
          {widgetConfig.name.replace(" Widget", "")}
        </h3>

        {/* Main Content - Emoji + Value inline */}
        <div className="flex items-center gap-3">
          {widgetConfig.icon && (
            <span className="text-4xl">{widgetConfig.icon}</span>
          )}
          <div className="flex-1">
            <div className="text-3xl font-semibold text-gray-900">
              {widget.data.value}
            </div>
          </div>
        </div>

        {/* Secondary Information */}
        {widget.data.location && (
          <div className="text-sm text-gray-600">{widget.data.location}</div>
        )}
        {widget.data.condition && (
          <div className="text-xs text-gray-500">{widget.data.condition}</div>
        )}
        {widget.data.symbol && (
          <div className="text-sm font-medium text-gray-600">
            {widget.data.symbol}
          </div>
        )}
        {widget.data.change && (
          <div
            className={`text-sm font-medium ${
              widget.data.change.startsWith("-") ||
              (widget.data.change.startsWith("+") &&
                parseFloat(widget.data.change) < 0)
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {widget.data.change}
          </div>
        )}
        {widget.data.trending && (
          <div className="text-xs text-gray-500">{widget.data.trending}</div>
        )}
        {widget.data.updated && (
          <div className="text-xs text-gray-400 mt-1">
            {widget.data.updated}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      draggable
      onDragStart={dragHandlers.onDragStart}
      onDragOver={dragHandlers.onDragOver}
      onDragEnd={dragHandlers.onDragEnd}
      className={`transition-all duration-200 h-full ${
        isDragging ? "opacity-60" : "opacity-100 shadow-sm"
      }`}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <Card
        className={`h-full transition-shadow ${
          isDragging ? "" : "hover:shadow-md"
        }`}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 text-gray-400 cursor-grab active:cursor-grabbing" />
            <CardTitle className="text-gray-500 text-sm font-medium">
              {widgetConfig.name}
            </CardTitle>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              onClick={onRefresh}
              disabled={widget.loading}
              title="Refresh data"
            >
              <RefreshCw
                className={`h-4 w-4 ${widget.loading ? "animate-spin" : ""}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
              onClick={onRemove}
              title="Remove widget"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>{renderWidgetContent()}</CardContent>
      </Card>
    </div>
  );
}
