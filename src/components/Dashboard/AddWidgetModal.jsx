import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { WIDGET_TYPES } from "@/constants";

export function AddWidgetModal({ open, onOpenChange, onAddWidget }) {
  const handleWidgetClick = (widgetId) => {
    onAddWidget(widgetId);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
          <DialogDescription>
            Choose a widget to add to your dashboard
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-1">
          <div className="grid grid-cols-2 gap-4 p-1">
            {Object.values(WIDGET_TYPES).map((widget) => (
              <button
                key={widget.id}
                onClick={() => handleWidgetClick(widget.id)}
                className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group cursor-pointer"
              >
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {widget.icon}
                </span>
                <span className="text-sm font-medium text-gray-900 text-center">
                  {widget.name}
                </span>
                {widget.description && (
                  <span className="text-xs text-gray-500 text-center mt-1">
                    {widget.description}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
