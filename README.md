
### Example
```js
import { PubSub, EMIT_GLOBAL } from 'pub-sub';


const pubsub = new PubSub();

const unsubscribeChat = pubsub.on('chat/message', (message) => {
  ...
});
const dialogHandler = (payload) => { ... };
pubsub.on('dialog/opened', dialogHandler);



pubsub.emit('chat/message', 'Hello');
/* Emit event to every subscriber */
pubsub.emit(EMIT_GLOBAL, '[System error]');



/* Remove subscriptions */

unsubscribeChat();

pubsub.off('dialog/opened', dialogHandler); 
/* or remove all subscribers of specific event */
pubsub.off('dialog/opened');
```

