import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { WIDGET_TYPES } from "@/constants";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateWidgetId = () => {
  return `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const isValidWidgetType = (type) => {
  return Object.keys(WIDGET_TYPES).includes(type.toUpperCase());
};
