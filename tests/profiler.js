import fs from "fs";
import { app } from "electron";

class Profiler {
  constructor() {
    this.intervals = [];
  }

  start() {
    // Monitor CPU and Memory every 5 seconds
    const interval = setInterval(() => {
      const memoryUsage = process.memoryUsage();
      const cpuUsage = process.cpuUsage();

      const log = {
        timestamp: new Date().toISOString(),
        memoryUsage,
        cpuUsage,
      };

      console.log(JSON.stringify(log));

      // Optionally, write to a file
      fs.appendFileSync("performance.log", JSON.stringify(log) + "\n");
    }, 5000);

    this.intervals.push(interval);
  }

  stop() {
    this.intervals.forEach(clearInterval);
  }
}

export default new Profiler();
