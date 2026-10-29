#!/usr/bin/env node
// Formats one known UTC instant in two IANA time zones; it does not schedule an event.
// Requires Node.js 22+ with ICU time-zone data.
const instant = new Date("2026-11-02T17:00:00Z");
const zones = ["America/Los_Angeles", "Europe/London"];
for (const timeZone of zones) {
  const value = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    timeZoneName: "longOffset"
  }).format(instant);
  console.log(timeZone + ": " + value);
}
