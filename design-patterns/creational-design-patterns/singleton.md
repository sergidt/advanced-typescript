[Main menu](../../README.md){: .float-right}

# Singleton pattern

Point-free programming (Tacit programming) is a programming paradigm in which a function definition does not include information regarding its arguments, using combinators and function composition instead of variables.


```typescript
class Singleton {
    private static instance: Singleton;
    private constructor() {
        // do something construct...
    }
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
            // ... any one time initialization goes here ...
        }
        return Singleton.instance;
    }
    someMethod() { }
}
```

## How to use?

```typescript
let instance = Singleton.getInstance();
instance.someMethod();
```
