/* eslint-disable no-console */

import Markdown from '@/src/components/formatting/Markdown/Markdown'

import Stack from '../Stack'
import Wrapper from '../Wrapper'

const markdownSample = `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

This is a regular paragraph with **bold text**, *italic text*, and ***bold italic text***.

You can also add [links to bratislava.sk](https://bratislava.sk).

## Ordered Lists

1. First item
2. Second item
3. Third item
   1. Nested item
      1. Even more nested item
      2. Even more nested item
   2. Nested item
4. Fourth item

## Unordered Lists

- Item one
- Item two
- Item three
  - Nested item
  - Another nested item
    - Deeply nested item
- Item four

## Superscript and Subscript

E = mc^2^ is Einstein's famous equation.

H~2~O is the chemical formula for water.

## Blockquote

> This is a blockquote.
> It can span multiple lines.
>
> And even have multiple paragraphs.
`

const MarkdownShowcase = () => {
  return (
    <Wrapper direction="column" title="Markdown">
      <Stack className="grid items-start lg:grid-cols-4">
        <Markdown content={markdownSample} variant="small" />
        <Markdown content={markdownSample} />
        <Markdown content={markdownSample} variant="large" />
        <Markdown content={markdownSample} variant="accordion" />
      </Stack>
    </Wrapper>
  )
}

export default MarkdownShowcase
