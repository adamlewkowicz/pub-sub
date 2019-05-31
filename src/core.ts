import { EMIT_GLOBAL } from './consts';


export class PubSub {

  private events: Subscriptions

  constructor() {
    this.events = {};
  }
  
  /**
   * Creates subscription handler
   * @param eventName Event name that is subscription created for
   * @param handler Subscription handler
   * @returns {function} unsubscribe - removes subscription handler
   */
  on(eventName: string, handler: SubscriptionHandler): Unsubscribe {
    if (eventName === EMIT_GLOBAL) {
      throw new Error(`Event name: ${EMIT_GLOBAL} is not allowed`);
    }
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(handler);

    return () => this.off(eventName, handler);
  }

  /**
   * Emits event to subscribers
   * @param eventName Event name that is event emitted for
   * @param data Payload that subscription handlers will receive
   */
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
  }

  /**
   * Removes subscription handler
   * @param eventName Removes subscritpion handler for event name
   * @param handlerToRemove Subscription handler to remove
   */
  off(eventName: string, handlerToRemove: SubscriptionHandler) {
    const listeners = this.events[eventName];

    if (listeners && listeners.length) {
      this.events[eventName] = listeners.filter(handler => {
        handler === handlerToRemove
      });
    }
  }

  private get eventsArray() {
    return Object.values(this.events);
  }
}


export interface SubscriptionHandler {
  (data: Payload): void;
}

export type Payload = string | number | object;

interface Subscriptions {
  [eventName: string]: SubscriptionHandler[]
}

export type Unsubscribe = Function;