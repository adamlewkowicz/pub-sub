
interface SubscriptionHandler {
  (data: Payload): void;
}

type Payload = string | number | object;

interface Subscriptions {
  [eventName: string]: SubscriptionHandler[]
}

const EMIT_GLOBAL = '*';

/**
 * Removes subscription from event
 */
type Unsubscribe = Function;

const PubSub = {
  events: {} as Subscriptions,
  
  on(eventName: string, handler: SubscriptionHandler): Unsubscribe {
    if (eventName === EMIT_GLOBAL) {
      throw new Error(`Event name: ${EMIT_GLOBAL} is not allowed`);
    }
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(handler);

    return () => this.off(eventName, handler);
  },
  emit(eventName: string, data: Payload) {

    if (eventName === EMIT_GLOBAL) {
      for (const listeners of this.eventsArray) {
        for (const listener of listeners) {
          listener(data);
        }
      }
      return;
    }

    if (this.events[eventName] && this.events[eventName].length) {
      for (const listener of this.events[eventName]) {
        listener(data);
      }
    }
  },
  off(eventName: string, handlerToRemove: SubscriptionHandler) {
    const listeners = this.events[eventName];

    if (listeners && listeners.length) {
      this.events[eventName] = listeners.filter(handler => {
        handler === handlerToRemove
      });
    }
  },

  get eventsArray() {
    return Object.values(this.events);
  }
}