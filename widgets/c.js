import {Widget} from "./../libraries/X.js";

export default class WidgetC extends Widget {
    async init(target, done) {
        target.classList.add('widget-container__widget-c-initialized');
        done();
    }

    destroy(target) {
        target.classList.remove('widget-container__widget-c-initialized');
    }
}