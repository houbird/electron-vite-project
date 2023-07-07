import React from 'react';
import Button from './component/Button';

const { exec } = window.require('child_process');

const App: React.FC = () => {
  const handleButtonClick = () => {
    exec('whoami', (error: Error | null, stdout: string, stderr: string) => {
      if (error) {
        console.error(`Error executing command: ${error}`);
        return;
      }
      const username = stdout.trim();
      console.log(`Username: ${username}`);
      alert(`Username: ${username}`);
    });
  };

  return (
    <div>
      <h1>React Electron App</h1>
      <Button onClick={handleButtonClick} />
    </div>
  );
};

export default App;
