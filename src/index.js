const wrap = (field, action, proto) => {

    const descriptor = Reflect.getOwnPropertyDescriptor(proto, field);
    if (!descriptor.configurable) return; // cannot config

    const value = descriptor.value;
    if (typeof value !== 'function') return; // cannot no function

    Object.defineProperty(proto, field, Object.assign({}, descriptor, {
        value() {
            action(field, arguments, value, this);
            return value.apply(this, arguments);
        }
    }));
};

export default function classMethodAction(action) {
    return clz => {
        const proto = clz.prototype;
        Object.getOwnPropertyNames(proto).forEach(field => wrap(field, action, proto));
        return clz;
    };
}