[Main menu](../../README.md){: .float-right}

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

## Benefits

**Readability: the code becomes easy to read.**

## Another example

```typescript
private const BIG_AMOUNT = 10;  

public getBigTransactions(transactions: Transaction[]) {
  return transactions.filter((t: Transaction) => t.amount > this.BIG_AMOUNT);
}
```
This works, but now your inner function implementation depends on a “external” constant now, which is not good, is an antipattern. We want our function to be “pure”, meaning all inputs is provided to the function.

Let’s say how can do this in point free style:

```typescript
private const BIG_AMOUNT = 10;

public getBigTransactions(transactions: Transaction[]) {
  return transactions.filter(this.moreThan(this.BIG_AMOUNT));
}
private moreThan(amount: number) {
  return (transaction: Transaction) => transactions.amount > amount;
}
```

## Watch out “this”
If I change the above code to the following, will it work?

```typescript
private const BIG_AMOUNT = 10;

public getBigTransactions(transactions: Transaction[]) {
  return transactions.filter(this.moreThanBigAmount);
}
private moreThanBigAmount(transaction: Transaction) {
  return transactions.amount > this.BIG_AMOUNT;
}
```
**The answer is: no, it won’t work because of “this”.**

`this` basically depends on the caller. Here, when this.moreThanBigAmount is called in the filter callback, the caller is `window`.

We could solve this issue by bind to this when defining functions, but we should avoid doing that.

**If we try to program or think in functional programming, we need to explicitly define all the dependencies as function inputs. And we should avoid using `this` in any of the functions that’ll be passed as first class objects.**

## How does Point Free Work
So point free function works by:

* Provide function name where it expects a function.
* And in most of the cases, that function needs to be partially applied.
