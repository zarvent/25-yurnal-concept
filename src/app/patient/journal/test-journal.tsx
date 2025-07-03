import React, { useEffect } from 'react';
import { useJournal } from '@/hooks/use-journal';

const TestJournal = () => {
  const { entries, isLoaded, addEntry, getEntriesAsText } = useJournal();

  useEffect(() => {
    if (isLoaded) {
      console.log('Entries loaded:', entries);
      console.log('Entries as text:', getEntriesAsText());
    } else {
      console.log('Loading entries...');
    }
  }, [isLoaded, entries, getEntriesAsText]);

  const handleAddEntry = () => {
    const newEntry = {
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      content: 'This is a test entry',
      tags: [],
      userId: 'test-user',
      isPrivate: false,
      mood: 'neutral' as 'neutral', // Explicitly cast to allowed value
    };
    addEntry(newEntry);
    console.log('Entry added:', newEntry);
  };

  return (
    <div>
      <h1>Test Journal</h1>
      <button onClick={handleAddEntry}>Add Test Entry</button>
      <pre>{getEntriesAsText()}</pre>
    </div>
  );
};

export default TestJournal;
