import { contextBridge, ipcRenderer } from 'electron';

interface Command {
  id: string;
  data: string;
  useSudo: boolean;
}

contextBridge.exposeInMainWorld(
  'electron',
  {
    send: (channel: string, command: Command): void => {
      // whitelist channels
      const validChannels = ['exec-command'];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, command);
      }
    },
    receive: (channel: string, func: (...args: unknown[]) => void): void => {
      const validChannels = ['exec-command-response'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender` 
        ipcRenderer.on(channel, (_event, ...args: unknown[]) => func(...args));
      }
    }    
  }
);

function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']): Promise<boolean> {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}

const safeDOM = {
  append: (parent: HTMLElement, child: HTMLElement): void => {
    if (!Array.from(parent.children).find(e => e === child)) {
      parent.appendChild(child);
    }
  },
  remove: (parent: HTMLElement, child: HTMLElement): void => {
    if (Array.from(parent.children).find(e => e === child)) {
      parent.removeChild(child);
    }
  },
};

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
  const className = `loaders-css__square-spin`
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #282c34;
  z-index: 9;
}
    `
    const oStyle = document.createElement('style');
    const oDiv = document.createElement('div');
  
    oStyle.id = 'app-loading-style';
    oStyle.innerHTML = styleContent;
    oDiv.className = 'app-loading-wrap';
    oDiv.innerHTML = `<div class="${className}"><div></div></div>`;
  
    return {
      appendLoading: (): void => {
        safeDOM.append(document.head, oStyle);
        safeDOM.append(document.body, oDiv);
      },
      removeLoading: (): void => {
        safeDOM.remove(document.head, oStyle);
        safeDOM.remove(document.body, oDiv);
      },
    };
  }
  
  const { appendLoading, removeLoading } = useLoading();
  domReady().then(appendLoading);
  
  window.onmessage = (ev: MessageEvent): void => {
    if (ev.data.payload === 'removeLoading') {
      removeLoading();
    }
  };
  
  setTimeout(removeLoading, 4999);