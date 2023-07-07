import React, { useEffect } from 'react';
import Button from './component/Button';
const { ipcRenderer } = window.require('electron');

const App: React.FC = () => {
  const handleButtonClick = () => {
    window.electron.exec('whoami', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error}`);
        return;
      }
      const username = stdout.trim();
      console.log(`Username: ${username}`);
      alert(`Username: ${username}`);
    });
  };
  

  useEffect(() => {
    ipcRenderer.on('exec-command-response', (event, { error, stdout, stderr }) => {
      if (error) {
        console.error(`Error executing command: ${error}`);
        return;
      }
      const username = stdout.trim();
      console.log(`Username: ${username}`);
      alert(`Username: ${username}`);
    });
  }, []);

  return (
    <div>
      <h1>React Electron App</h1>
      <Button onClick={handleButtonClick} />
    </div>
  );
};

export default App;
