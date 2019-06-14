export interface Command {
  commandType: "START" | "PAUSE";
  timestamp: number;
}