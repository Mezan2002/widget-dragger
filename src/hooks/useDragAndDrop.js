import { useCallback, useState } from "react";

/**
 * Custom hook for managing drag-and-drop functionality
 *
 * EVENT-DRIVEN ARCHITECTURE:
 * This hook demonstrates event-driven thinking by encapsulating all drag-and-drop
 * event handlers in one place. It manages local state for visual feedback and
 * delegates the actual reordering logic to a parent component through callbacks.
 *
 * SEPARATION OF CONCERNS:
 * - This hook handles UI events and visual state
 * - Parent component handles business logic (reordering)
 * - Clean separation makes the code testable and reusable
 *
 * @param {Function} onReorder - Callback function to handle widget reordering
 * @returns {Object} Drag and drop event handlers and current drag state
 */
export function useDragAndDrop(onReorder) {
  // Local state for tracking drag operations (for visual feedback only)
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  /**
   * Handles the drag start event
   * EVENT FLOW: User starts dragging → Store index → Add visual feedback
   */
  const handleDragStart = useCallback(
    (index) => (e) => {
      setDraggedIndex(index);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", e.currentTarget);

      // PERFORMANCE: setTimeout ensures DOM has updated before applying class
      // This prevents flashing and ensures smooth visual transition
      setTimeout(() => {
        e.currentTarget.classList.add("dragging");
      }, 0);
    },
    []
  );

  /**
   * Handles drag over event (when hovering over a drop target)
   * EVENT FLOW: Dragging over element → Prevent default → Update visual state
   */
  const handleDragOver = useCallback(
    (index) => (e) => {
      e.preventDefault(); // Required to allow dropping
      e.dataTransfer.dropEffect = "move";

      // Only update state if we're hovering over a different element
      // PERFORMANCE: Prevents unnecessary re-renders
      if (draggedIndex !== null && draggedIndex !== index) {
        setDragOverIndex(index);
      }
    },
    [draggedIndex]
  );

  /**
   * Handles drag end event (when user releases the mouse)
   * EVENT FLOW: Drop → Clean up classes → Trigger reorder → Reset state
   *
   * This is where the event-driven pattern shines: we delegate the actual
   * business logic (reordering) to the parent component while handling
   * the UI concerns (cleanup) here.
   */
  const handleDragEnd = useCallback(
    (e) => {
      e.currentTarget.classList.remove("dragging");

      // Only trigger reorder if we have a valid drop operation
      if (
        draggedIndex !== null &&
        dragOverIndex !== null &&
        draggedIndex !== dragOverIndex
      ) {
        // ARCHITECTURE: Callback pattern for loose coupling
        onReorder(draggedIndex, dragOverIndex);
      }

      // Clean up state after operation completes
      setDraggedIndex(null);
      setDragOverIndex(null);
    },
    [draggedIndex, dragOverIndex, onReorder]
  );

  /**
   * Handles drag leave event (when cursor leaves a drop target)
   * Resets the drag-over visual state
   */
  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  return {
    draggedIndex,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragLeave,
  };
}
