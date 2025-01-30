class X {
    // <!--    TODO Kilka testów jednostkowych i przesłanie rozwiązania na GitHub (niekoniecznie na głównym koncie) będą mile widziane.-->
    // TODO to skakanie strony gdy sie pojawia info

    constructor(resolver) {
        this.resolver = resolver || (path => import(path));
        this.initializedWidgets = new Map();
    }

    async init(target, callback) {
        const widgetNodes = target.querySelectorAll('[widget]');
        const promises = [];

        try {
            for (const node of widgetNodes) {
                const widgetPath = node.getAttribute('widget');
                if (!this.initializedWidgets.has(node)) {
                    const widgetModule = await this.resolver(`./../${widgetPath}.js`);
                    const widgetInstance = new widgetModule.default();
                    this.initializedWidgets.set(node, widgetInstance);

                    const initPromise = new Promise((resolve, reject) => {
                        widgetInstance.init(node, () => {
                            node.classList.add('widget-container__widget-initialized');
                            resolve();
                        });
                    });

                    promises.push(initPromise);
                }
            }

            await Promise.all(promises);
            callback(null);
        } catch (error) {
            callback(error);
        }
    }

    destroy(target) {

        const widgets = [...target.querySelectorAll('[widget]')].reverse();
        for (let widgetNode of widgets) {
            const widgetInstance = this.initializedWidgets.get(widgetNode);
            if (widgetInstance) {
                widgetInstance.destroy(widgetNode);
                widgetNode.classList.remove('widget-container__widget-initialized');
                this.initializedWidgets.delete(widgetNode);
            }
        }
    }
}

class Widget {
    constructor() {
        this.bindHandlers();
    }

    bindHandlers() {
        const handlerRegex = /Handler$/;
        for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            if (handlerRegex.test(key) && typeof this[key] === 'function') {
                this[key] = this[key].bind(this);
            }
        }
    }

    async init(target, done) {
        target.classList.add('widget-container__widget-initialized');
        done();
    }

    destroy(target) {
        target.classList.remove('widget-container__widget-initialized');
    }
}

export {X, Widget};