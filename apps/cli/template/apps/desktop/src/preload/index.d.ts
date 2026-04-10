import type { ElectronAPI } from "@electron-toolkit/preload";

declare global {
  // biome-ignore lint/style/useConsistentTypeDefinitions: interface required for global Window augmentation
  interface Window {
    api: unknown;
    electron: ElectronAPI;
  }
}
