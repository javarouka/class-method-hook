# ES7 Class Method Hook

[![Build Status](https://travis-ci.org/javarouka/class-method-hook.svg)](https://travis-ci.org/javarouka/class-method-hook)

## Getting Started
```sh
npm i class-method-hook
```

## Usage
```
import hook from 'class-method-hook'

const logging = (field, value, context) => console.log(`${field} execute!`);

@hook(logging)
class Some {
  method1(){}
  method2(){}
}

const some = new Some();
some.method1(); // method1 execute!
some.method2(); // method1 execute!
```

## License
MIT