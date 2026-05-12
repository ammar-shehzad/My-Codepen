'use client';
import React, { useRef } from 'react';
import Terminal from 'react-console-emulator';

// 1. Define the commands object OUTSIDE or INSIDE the component
const commands = {
  echo: {
    description: 'Echo a passed string.',
    usage: 'echo <string>',
    fn: (...args: string[]) => args.join(' ')
  },
  help: {
    description: 'Show available commands.',
    fn: () => 'Available commands: echo, help'
  }
};

export default function MyTerminal() {
  // Use InstanceType to derive the type from the Terminal component itself
  const terminalRef = useRef<InstanceType<typeof Terminal>>(null);

  return (
    <Terminal
      ref={terminalRef}
      commands={commands} // 2. Now 'commands' is defined
      welcomeMessage={'Welcome to my app! Type "help" to start.'}
      promptLabel={'user@app:~$'}
      style={{ height: '400px' }}
    />
  );
}
