## Usage

`finden` helps you _find_ where you're using components from a given library.

Here's an example:

```bash
cd my-project
cat app.js
```
```js
import React from 'react'
import Container from 'ui-library/container'
import Input from 'ui-library/input'
import Button from 'ui-library/button'

export default App = () => (
  <Container>
    <Input type='text' placeholder='username' />
    <Input type='password' placeholder='password' />
    <Button>Login</Button>
  </Container>
)
```

and now run `finden` to find all the components that come from `ui-library`!

```bash
$ finden ui-library
{
  "Container": {
    "fixtures/app.js": [
      7
    ]
  },
  "Input": {
    "fixtures/app.js": [
      8,
      9
    ]
  },
  "Button": {
    "fixtures/app.js": [
      10
    ]
  }
}
```

The json that is returned is a map of all the components that were found. Each component has a map from file names to an array of line numbers.

More specifically the schema is:

```js
type ComponentMap = {
  [componentName: string]: FileMap
}

type FileMap = {
  [fileName: string]: LineNumber[]
}

type LineNumber = number
```

### CLI
```bash
finden <pattern> [glob]
```

- `pattern` - The search term. A JSX tag will be a match if it comes from an `import` statement that _contains_ `pattern`
- `glob` - An optional glob pattern to specify which files should be searched. Default value is `**/*.js`

__Example__
```bash
finden ui-library "**/*.jsx"
```

## Installation

```bash
npm install -g finden
```
