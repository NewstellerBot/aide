import { onWindowMessage } from "./window";

export const EVENTS = {

    'some_event:do_something': () => {
        // do something here
    },
    "window:message": onWindowMessage,
}
