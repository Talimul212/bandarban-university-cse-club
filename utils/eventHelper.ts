// utils/eventHelpers.ts
import {
  format,
  isPast,
  isFuture,
  isWithinInterval,
  differenceInSeconds,
} from "date-fns";

export const getEventStatus = (event: any) => {
  if (event.isTba || !event.startDateTime) return "Upcoming"; // Default for TBA

  const now = new Date();
  const start = new Date(event.startDateTime);
  const end = new Date(event.endDateTime);

  if (isWithinInterval(now, { start, end })) return "Running";
  if (isPast(end)) return "Completed";
  return "Upcoming";
};

export const formatRange = (startIso: string, endIso: string) => {
  if (!startIso || !endIso) return "Time: TBA";
  const start = new Date(startIso);
  const end = new Date(endIso);

  if (start.toDateString() === end.toDateString()) {
    // Same day event: 12 Jan 2026, 10:00 AM - 1:00 PM
    return `${format(start, "d MMM yyyy")}, ${format(start, "h:mm a")} - ${format(end, "h:mm a")}`;
  }
  return `${format(start, "d MMM yyyy")} - ${format(end, "d MMM yyyy")}`;
};
