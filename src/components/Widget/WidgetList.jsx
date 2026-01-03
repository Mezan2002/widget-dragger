import { Widget } from "@/components/Widget";

export function WidgetList({ widgets, onRemove, onRefresh, dragAndDropProps }) {
  const {
    draggedIndex,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragLeave,
  } = dragAndDropProps;

  // Visual Reordering Logic
  let displayWidgets = [...widgets];
  if (
    draggedIndex !== null &&
    dragOverIndex !== null &&
    widgets[draggedIndex]
  ) {
    const draggedItem = displayWidgets[draggedIndex];
    displayWidgets.splice(draggedIndex, 1);
    displayWidgets.splice(dragOverIndex, 0, draggedItem);
  }

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
    <div className="space-y-4" onDragLeave={handleDragLeave}>
      {displayWidgets.map((widget, index) => {
        // We need to find the ORIGINAL index for the drag start handler to ensure consistency
        // But for dragOver, we use the visual index
        const originalIndex = widgets.findIndex((w) => w.id === widget.id);
        const isDragging = originalIndex === draggedIndex;

        return (
          <Widget
            key={widget.id}
            widget={widget}
            onRemove={() => onRemove(widget.id)}
            onRefresh={() => onRefresh(widget)}
            dragHandlers={{
              onDragStart: handleDragStart(originalIndex),
              onDragOver: handleDragOver(index),
              onDragEnd: handleDragEnd,
            }}
            isDragging={isDragging}
          />
        );
      })}
    </div>
  );
}
