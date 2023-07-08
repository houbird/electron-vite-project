import React, { useEffect, useState } from 'react';
import Button from './component/Button';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');

  const handleButtonClick = (): void => {
    console.log('Button clicked');
    window.electron.send('exec-command', 'whoami');
  };

  useEffect(() => {
    console.log('App mounted');
    window.electron.receive('exec-command-response', (response: { error: Error, stdout: string, stderr: string }) => {
      if (response.error) {
        console.error(`Error executing command: ${response.error}`);
        return;
      }
      const username = response.stdout.trim();
      console.log(`Username: ${username}`);
      setUsername(username);
    });
  }, []);

  return (
    <div>
      <h1>React Electron App</h1>
      <p>{username}</p>
      <Button onClick={handleButtonClick} />
    </div>
  );
};

export default App;
