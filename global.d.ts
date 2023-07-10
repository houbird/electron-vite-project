import preload from 'electron/preload';

declare global {
  interface Window {
    electron: {
      send: (channel: string, preload: preload) => void;
      receive: (channel: string, func: (data: never) => void) => void;
    };
  }
}

export {};
