## Point-free

Point-free programming (Tacit programming) is a programming paradigm in which a function definition does not include information regarding its arguments, using combinators and function composition instead of variables.


<pre><code class="typescript hljs">
    interface Transaction {
        amount: number;
    }
</code></pre>

And now you want to get a list of positive transactions. Usually you can do this:

<pre><code class="typescript hljs">
public getPositiveTransactions(transactions: Transaction[]) {
    return transactions.filter((t: Transaction) => t.amount > 0));
}
</code></pre>

Or you can achieve point-free style by passing the function name to the filter callback.

<pre><code class="typescript hljs">
public getPositiveTransactions(transactions: Transaction[]) {
    return transactions.filter(this.isPositive);
}

private isPositive(transaction: Transaction) {
    return transactions.amount > 0;
}
</code></pre>


https://itnext.io/whats-point-free-style-in-typescript-39337000c8cb

https://medium.freecodecamp.org/how-point-free-composition-will-make-you-a-better-functional-programmer-33dcb910303a)