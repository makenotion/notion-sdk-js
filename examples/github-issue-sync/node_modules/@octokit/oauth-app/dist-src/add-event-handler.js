export function addEventHandler(state, eventName, eventHandler) {
    if (Array.isArray(eventName)) {
        for (const singleEventName of eventName) {
            addEventHandler(state, singleEventName, eventHandler);
        }
        return;
    }
    if (!state.eventHandlers[eventName]) {
        state.eventHandlers[eventName] = [];
    }
    state.eventHandlers[eventName].push(eventHandler);
}
