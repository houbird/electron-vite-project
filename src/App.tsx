import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';

interface Command {
  id: string;
  data: string;
  useSudo: boolean;
}

const App = () => {
  const [username, setUsername] = useState<string>('unknown Username');
  const [modelName, setModelName] = useState<string>('unknown ModelName');
  const [supserusername, setSupserusername] = useState<string>('unknown sudo Username');

  const handleButtonClick = (): void => {
    console.log('Button clicked');
    const commands: Command[] = [
      { id: 'exec-command-1', data: 'whoami', useSudo: false },
      { id: 'exec-command-2', data: 'lscpu | grep "Model name"', useSudo: false },
      { id: 'exec-command-3', data: 'whoami', useSudo: true }
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
          setSupserusername(result);
          break;
        default:
          console.error(`Unknown command id: ${id}`);
      }
    });
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <nav className="navbar">
          <div className="flex flex-row h-8 w-full">
            <div className="flex-grow" style={{ '-webkit-app-region': 'drag' } as React.CSSProperties}>
              
            </div>
            <button className="flex-shrink-0 flex items-center justify-center p-0 m-1 h-6 w-6 " onClick={() => window.electron.send('close-window', {})}>
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </nav>
        <div className="content-body flex-grow">
          <h1 className="text-primaryColor">React Electron App</h1>
          <button onClick={handleButtonClick}>Run Command</button>
          <hr/>
          <table border={0} width="100%">
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
                <td>Super UserName</td>
                <td>
                  <pre>{supserusername}</pre>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <footer className="h-8 bg-gray-800">
          <p className="text-sm text-center">&copy; 2023 <a href="" target="_blank" rel="noreferrer">My Website</a>. All Rights Reserved. <a href="" target="_blank" rel="noreferrer">Privacy Policy</a></p>
        </footer>
      </div>
    </>
  );
};

export default App;
