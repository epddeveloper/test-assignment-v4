import { X, Widget } from './X.js';
import WidgetA from './../widgets/a.js';

describe('X class', () => {
    let xInstance;
    let target;
    let resolver;

    beforeEach(() => {
        resolver = jest.fn(path => Promise.resolve({
            default: WidgetA
        }));
        xInstance = new X(resolver);
        target = document.createElement('div');
        target.innerHTML = '<div widget="widgets/a"></div>';
    });

    test('init initializes WidgetA', async () => {
        const callback = jest.fn();
        await xInstance.init(target, callback);

        expect(callback).toHaveBeenCalledWith(null);
        expect(target.querySelector('[widget]').classList.contains('widget-container__widget-a-initialized')).toBe(true);
    });

    test('destroy destroys WidgetA', async () => {
        const callback = jest.fn();
        await xInstance.init(target, callback);
        xInstance.destroy(target);

        expect(target.querySelector('[widget]').classList.contains('widget-container__widget-a-initialized')).toBe(false);
    });

    test('resolver function is called with correct path', async () => {
        const callback = jest.fn();
        await xInstance.init(target, callback);

        expect(resolver).toHaveBeenCalledWith('./../widgets/a.js');
    });
});
