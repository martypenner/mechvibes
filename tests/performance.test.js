import { describe, it, expect, beforeAll } from "vitest";
import TinyBench from "tinybench";
import { playSound } from "../src/utils/play_sound";

describe("Performance Benchmarks with CPU and Memory Monitoring", () => {
  let bench;
  let cpuUsageStart;
  let memoryUsageStart;

  beforeAll(() => {
    bench = new TinyBench({
      runs: 1000,
      warmup: 100,
    });

    // Capture initial CPU and memory usage
    cpuUsageStart = process.cpuUsage();
    memoryUsageStart = process.memoryUsage();
  });

  it("playSound function should perform within acceptable limits and not leak memory", () => {
    bench.run(() => {
      playSound();
    });

    const stats = bench.getStats();

    console.log(
      `PlaySound - Mean: ${stats.mean.toFixed(
        4
      )} ms, StdDev: ${stats.deviation.toFixed(4)} ms`
    );

    const cpuUsageEnd = process.cpuUsage(cpuUsageStart);
    const memoryUsageEnd = process.memoryUsage();

    console.log(
      `CPU Usage - User: ${(cpuUsageEnd.user / 1000).toFixed(2)} ms, System: ${(
        cpuUsageEnd.system / 1000
      ).toFixed(2)} ms`
    );
    console.log(
      `Memory Usage - RSS: ${memoryUsageEnd.rss} bytes, Heap Total: ${memoryUsageEnd.heapTotal} bytes, Heap Used: ${memoryUsageEnd.heapUsed} bytes`
    );

    expect(stats.mean).toBeLessThan(1);

    // Check for memory leaks (heapUsed should not increase significantly)
    const heapUsedIncrease =
      memoryUsageEnd.heapUsed - memoryUsageStart.heapUsed;
    expect(heapUsedIncrease).toBeLessThan(1024 * 1024); // Example: Less than 1MB increase
  });
});
