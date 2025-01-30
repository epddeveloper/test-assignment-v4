import {Widget} from "./../libraries/X.js";

export default class WidgetA extends Widget {
    async init(target, done) {
        target.classList.add('widget-container__widget-a-initialized');
        done();
    }

    destroy(target) {
        target.classList.remove('widget-container__widget-a-initialized');
    }

    widgetAHandler() {
        console.log('Handler from WidgetA');
    }
}
