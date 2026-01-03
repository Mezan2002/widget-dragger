import { Widget } from "@/components/Widget";

export function WidgetList({ widgets, onRemove, onRefresh, dragAndDropProps }) {
  const {
    draggedIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragLeave,
  } = dragAndDropProps;

  if (widgets.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg bg-white">
        <div className="text-6xl mb-4">📊</div>
        <p className="text-xl font-medium text-gray-700 mb-2">No widgets yet</p>
        <p className="text-sm text-gray-500">
          Add widgets using the buttons above to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {widgets.map((widget, index) => (
        <Widget
          key={widget.id}
          widget={widget}
          onRemove={() => onRemove(widget.id)}
          onRefresh={() => onRefresh(widget)}
          dragHandlers={{
            onDragStart: handleDragStart(index),
            onDragOver: handleDragOver(index),
            onDragEnd: handleDragEnd,
            onDragLeave: handleDragLeave,
          }}
          isDragging={draggedIndex === index}
        />
      ))}
    </div>
  );
}
