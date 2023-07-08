declare global {
  interface Window {
    electron: {
      send: (id: string, channel: string, data: any) => void;
      receive: (channel: string, func: (data: any) => void) => void;
    };
  }
}

export {};
