const applied = Symbol('classMethodAction');

const isApplied = clz => clz.prototype[applied] === applied;
const wrap = (field, action, proto) => {

    const descriptor = Reflect.getOwnPropertyDescriptor(proto, field);
    if (!descriptor.configurable) return; // cannot config

    const value = descriptor.value;
    if (typeof value !== 'function') return; // cannot no function

    Object.defineProperty(proto, field, Object.assign({}, descriptor, {
        value() {
            action(field, value, this);
            return value.apply(this, arguments);
        }
    }));
};

export default function classMethodAction(action) {
    return clz => {
        if (isApplied(clz)) return clz;
        const proto = clz.prototype;
        proto[applied] = applied;
        Object.getOwnPropertyNames(proto).forEach(field => wrap(field, action, proto));
        return clz;
    }
}