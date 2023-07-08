import React, { useEffect, useState } from 'react';
import Button from './component/Button';

interface Command {
  id: string;
  data: string;
  useSudo: boolean;
}

const App = () => {
  const [username, setUsername] = useState<string>('unknown Username');
  const [modelName, setModelName] = useState<string>('unknown ModelName');
  const [dockerPsOutput, setDockerPsOutput] = useState<string>('Needed sudo to run docker ps');

  const handleButtonClick = (): void => {
    console.log('Button clicked');
    const commands: Command[] = [
      { id: 'exec-command-1', data: 'whoami', useSudo: false },
      { id: 'exec-command-2', data: 'lscpu | grep "Model name"', useSudo: false },
      { id: 'exec-command-3', data: 'docker images', useSudo: true }
    ];
    commands.forEach(command => window.electron.send('exec-command', command));
  };

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
      <h1 className='text-red-900'>React Electron App</h1>
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
