// To keep things simple, we'll be treating all Alt components as a singleton.
// With this pattern, we reuse the same instance within the whole application.
// To achieve this we can push it to a module of its own and then refer to
// that from everywhere.

import Alt from 'alt';
//import chromeDebug from 'alt-utils/lib/chromeDebug';

const alt = new Alt();
//chromeDebug(alt);

export default alt;

// Note: Webpack caches the modules so the next time you import Alt,
// it will return the same instance again.
