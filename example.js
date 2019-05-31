const { PubSub, EMIT_GLOBAL } = require('./dist/index');

(() => {
  const pubsub = new PubSub();

  const unsubscribe = pubsub.on('chat/message', console.log);
  pubsub.on('system/update', (payload) => {
    console.log(payload);
  });

  pubsub.emit('chat/message', 'Hello');
  pubsub.emit(EMIT_GLOBAL, 'Global message');

  unsubscribe();

  pubsub.emit('chat/message', 'It wont appear');
  pubsub.emit('system/update', { message: 'It will appear' });

  pubsub.off('system/update');

  pubsub.emit('system/update', { message: 'It wont appear' });
})();