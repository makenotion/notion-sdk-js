export async function emitEvent(state, context) {
    const { name, action } = context;
    if (state.eventHandlers[`${name}.${action}`]) {
        for (const eventHandler of state.eventHandlers[`${name}.${action}`]) {
            await eventHandler(context);
        }
    }
    if (state.eventHandlers[name]) {
        for (const eventHandler of state.eventHandlers[name]) {
            await eventHandler(context);
        }
    }
}
