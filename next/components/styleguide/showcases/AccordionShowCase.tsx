import Accordion from 'components/forms/simple-components/Accordion'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const AccordionShowCase = () => {
  const markdownSource = `

<div>
Plain text

line 1
line 2
line 3
line 4

# Headers

<div class='flex items-center'>

# h1 
&nbsp; &nbsp;
::tooltip[Tooltip text]

</div>

## h2
### h3
#### h4
##### h5
###### h6

# header *italic*
## header _italic text_
### header **bold text**
#### header __bold text__
##### header ~~strikethrough~~
###### header \`code\`
###### header \`\`\`code\`\`\`
###### header [bratislava](https://www.bratislava.sk/)

# Inline code

text \`inline code\` text
text \`\`\`inline code\`\`\` text
\`inline code\`
\`\`\`inline code\`\`\`

# URL

[bratislava](https://www.bratislava.sk/)
**[bratislava](https://www.bratislava.sk/)**
[~~bratislava~~](https://www.bratislava.sk/)

# Blockquotes

> blockquote _italic text_
>> blockquote **bold text**
>>> blockquotes ~~strikethrough~~

# Horisontal rules

---
***
___


# Ordered lists *(use 4 spaces)*

<ol>
  <li>Coffee</li>
  <li>Tea
    <ol>
      <li>Black tea</li>
      <li>Green tea</li>
    </ol>
  </li>
  <li>Milk</li>
</ol>

---

1. Aenean rutrum augue in dictum tempus
2. Lorem ipsum dolor sit amet
    1. Cras sed metus ut orci sodales fringilla
        1. Sed vehicula scelerisque augue
        2. Facilisis in pretium nisl aliquet
        3. Nulla volutpat aliquam velit
    2. Lorem ipsum dolor sit amet
3. Nam lacinia mauris in sollicitudin ornare
4. Quisque eu nunc ac elit maximus efficitur


# Unordered list

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
      + Lorem ipsum
+ Very easy!

# Emphasis

_italic_
*italic*
__bold__
**bold**
~~strikethrough~~

## Code blocks

\`\`\`
code block
  code block
    code block
\`\`\`

## Underlined

<u> Contents... </u>

</div>

<div class="flex items-center">

Hello 
&nbsp;
::tooltip[Tooltip]
    
</div>
`
  return (
    <Wrapper direction="column" title="Accordion">
      <Stack direction="column">
        <Accordion size="sm" title="Headline" shadow>
          {markdownSource}
        </Accordion>
        <Accordion size="md" title="Headline" shadow>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s
        </Accordion>
        <Accordion size="lg" title="Headline" shadow>
          {markdownSource}
        </Accordion>
        <Accordion size="sm" title="Headline">
          {markdownSource}
        </Accordion>
        <Accordion size="md" title="Headline">
          Text
        </Accordion>
        <Accordion size="lg" title="Headline">
          {markdownSource}
        </Accordion>
        <Accordion size="sm" title="Headline" icon>
          Text
        </Accordion>
        <Accordion size="md" title="Headline" icon>
          {markdownSource}
        </Accordion>
        <Accordion size="lg" title="Headline" icon className="sm:max-w-[500px]">
          {markdownSource}
        </Accordion>
      </Stack>
    </Wrapper>
  )
}

export default AccordionShowCase
