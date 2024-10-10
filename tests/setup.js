import { app } from "electron";
import profiler from "./profiler";

beforeAll(async () => {
  if (!app.isReady()) {
    await app.whenReady();
  }
  profiler.start();
});

afterAll(() => {
  profiler.stop();
  app.quit();
});
