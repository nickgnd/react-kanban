// this module set up the Final Store:
// bootstrapping (restore) and snapshotting.

// note: FinalStore is a store that listens to all existing stores.
//Every time some store changes, FinalStore will know about it.
// This makes it ideal for persistency.

import makeFinalStore from 'alt-utils/lib/makeFinalStore';

export default function(alt, storage, storeName) {
  const finalStore = makeFinalStore(alt);

  try {
    alt.bootstrap(storage.get(storeName));
  }
  catch(e) {
    console.error('Failed to bootstrap data', e);
  }

  finalStore.listen(() => {
    // you can set the flag (localStorage.setItem('debug', 'true')),
    // hit localStorage.clear() and refresh the browser to get a clean slate.
    if(!storage.get('debug')) {
      storage.set(storeName, alt.takeSnapshot());
    }
  });
}
