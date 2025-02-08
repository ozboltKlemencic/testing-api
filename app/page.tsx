'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    const response = await fetch('/api/hello', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'John' }),
    });
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <button 
        onClick={fetchData} 
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Fetch Greeting
      </button>
      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
}
