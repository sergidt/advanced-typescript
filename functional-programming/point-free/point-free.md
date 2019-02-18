[Main menu](../../README.md)

# Point-free

Point-free programming (Tacit programming) is a programming paradigm in which a function definition does not include information regarding its arguments, using combinators and function composition instead of variables.


```typescript
    interface Transaction {
        amount: number;
    }
```

And now you want to get a list of positive transactions. Usually you can do this:

```typescript
public getPositiveTransactions(transactions: Transaction[]) {
    return transactions.filter((t: Transaction) => t.amount > 0));
}
```

Or you can achieve point-free style by passing the function name to the filter callback.

```typescript
public getPositiveTransactions(transactions: Transaction[]) {
    return transactions.filter(this.isPositive);
}

private isPositive(transaction: Transaction) {
    return transactions.amount > 0;
}
```


https://itnext.io/whats-point-free-style-in-typescript-39337000c8cb

https://medium.freecodecamp.org/how-point-free-composition-will-make-you-a-better-functional-programmer-33dcb910303a)