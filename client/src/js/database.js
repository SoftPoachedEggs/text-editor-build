import { openDB } from 'idb';

const initdb = async () =>
  openDB('JATE', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('JATE')) {
        console.log('JATE database already exists');
        return;
      }
      db.createObjectStore('JATE', { keyPath: 'id', autoIncrement: true });
      console.log('JATE database created');
    },
  });

  export const putDb = async (content) => {
    const db = await openDB('JATE', 1);
    const tx = db.transaction('JATE', 'readwrite');
    const store = tx.objectStore('JATE');
    await store.put({id: 1, value: content});
    await tx.complete;
    console.log('Added to JATE database: ', content);
  };

  export const getDb = async () => {
    const db = await openDB('JATE', 1);
    const tx = db.transaction('JATE', 'readonly');
    const store = tx.objectStore('JATE');
    const items = await store.getAll();
    await tx.complete;
    console.log('Retrieved from JATE database: ', items);
    return items;
  };
initdb();