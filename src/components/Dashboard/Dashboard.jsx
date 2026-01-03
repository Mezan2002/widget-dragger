import { Plus } from "lucide-react";
import { useState } from "react";

import { useDragAndDrop, useWidgets } from "@/hooks";

import { AddWidgetModal } from "@/components/Dashboard";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { WidgetList } from "@/components/Widget";

export function Dashboard() {
  const { widgets, addWidget, removeWidget, refreshWidget, reorderWidgets } =
    useWidgets();
  const dragAndDropProps = useDragAndDrop(reorderWidgets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("custom");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Widget Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Drag and drop to rearrange widgets
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Sort order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Custom Order</SelectItem>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Widget
            </Button>
          </div>
        </div>

        {/* Widget List */}
        <WidgetList
          widgets={widgets}
          onRemove={removeWidget}
          onRefresh={refreshWidget}
          dragAndDropProps={dragAndDropProps}
        />

        {/* Add Widget Modal */}
        <AddWidgetModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onAddWidget={addWidget}
        />
      </div>
    </div>
  );
}
