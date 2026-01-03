import { GripVertical, RefreshCw, X } from "lucide-react";

import { WIDGET_TYPES } from "@/constants";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";

export function Widget({
  widget,
  onRemove,
  onRefresh,
  dragHandlers,
  isDragging,
}) {
  const widgetConfig = WIDGET_TYPES[widget.type.toUpperCase()];

  return (
    <div
      draggable
      onDragStart={dragHandlers.onDragStart}
      onDragOver={dragHandlers.onDragOver}
      onDragEnd={dragHandlers.onDragEnd}
      onDragLeave={dragHandlers.onDragLeave}
      className={`transition-all duration-200 ${
        isDragging ? "opacity-50 scale-95" : "opacity-100"
      }`}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 text-gray-400 cursor-grab active:cursor-grabbing" />
            <CardTitle className="text-gray-500">{widgetConfig.name}</CardTitle>
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
        <CardContent>
          {widget.loading ? (
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
          ) : widget.error ? (
            <div className="text-sm text-red-500">
              <p className="font-medium">Error</p>
              <p className="text-xs mt-1">{widget.error}</p>
            </div>
          ) : widget.data ? (
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
                <div className="text-sm text-gray-600">
                  {widget.data.location}
                </div>
              )}
              {widget.data.condition && (
                <div className="text-xs text-gray-500">
                  {widget.data.condition}
                </div>
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
                <div className="text-xs text-gray-500">
                  {widget.data.trending}
                </div>
              )}
              {widget.data.updated && (
                <div className="text-xs text-gray-400 mt-1">
                  {widget.data.updated}
                </div>
              )}
            </div>
          ) : (
            <div className="text-sm text-gray-500">No data available</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
