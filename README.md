# wiki-shell

## Get Wikipedia snippets right in your terminal

### Installation

```
npm install -g wiki-shell
```

To execute the CLI directly, use npx:

```
npx wiki-shell <search query>
```

### Usage

Use commands "wiki" or "wiki-shell" followed by a search query:

```
wiki lionel messi
```

And that's it!

By default, the above command only displays a single, terminal-friendly snippet of information; if you want to override this behavior to get more content, you can pass in a flag to specify the amount of content you need. Use [-a] to get all possible content, or use a [-l] or [--length] flag to specify exactly how many paragraphs of content you need.

```
wiki --length=10 al pacino
```

```
wiki -a spacex
```
