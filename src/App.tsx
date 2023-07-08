
import React, { useEffect, useState } from 'react';
import Button from './component/Button';

const App = () => {
  // username, modelName, and dockerPsOutput are all strings
  const [username, setUsername] = useState<string>('unknown Username');
  const [modelName, setModelName] = useState<string>('unknown ModelName');
  const [dockerPsOutput, setDockerPsOutput] = useState<string>('');

  // This function will be called when the button is clicked
  const handleButtonClick = (): void => {
    console.log('Button clicked');
    window.electron.send('exec-command-1', 'exec-command', 'whoami');
    window.electron.send('exec-command-2', 'exec-command', 'lscpu | grep "Model name"');
    window.electron.send('exec-command-3', 'exec-command', 'sudo docker ps');    
  };

  // When the component mounts, register a listener for the response event
  useEffect(() => {
    console.log('App mounted');
    window.electron.receive('exec-command-response', (response: { id: string, error: Error, stdout: string, stderr: string }) => {
      const { id, error, stdout, stderr } = response;
      if (error) {
        console.error(`Error executing command: ${error}`);
        return;
      }
      const result = stdout.trim();
      console.log(`Result: ${result}`);
      if (stderr) {
        console.error(`Command returned error: ${stderr}`);
        return;
      }
      switch (id) {
        case 'exec-command-1':
          setUsername(result);
          break;
        case 'exec-command-2':
          setModelName(result);
          break;
        case 'exec-command-3':
          setDockerPsOutput(result);
          break;
        default:
          console.error(`Unknown command id: ${id}`);
      }
    });
  }, []);

  return (
    <div>
      <h1>React Electron App</h1>
      <Button onClick={handleButtonClick} />
      <table border={1} width='100%'>
        <tbody>
          <tr>
            <td>Whoami</td>
            <td>{username}</td>
          </tr>
          <tr>
            <td>Model name</td>
            <td>{modelName}</td>
          </tr>
          <tr>
            <td>Docker PS Output</td>
            <td><pre>{dockerPsOutput}</pre></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
