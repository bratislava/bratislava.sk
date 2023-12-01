import { Typography } from '@bratislava/component-library'
import React from 'react'

import { Stack } from '../Stack'
import { Wrapper } from '../Wrapper'

const TypographyShowcase = () => {
  return (
    <Wrapper direction="column" title="Typography">
      <Stack direction="column">
        <Typography type="h1" size="h1-hero">
          H1 Hero heading default
        </Typography>
        <Typography type="h1">H1 heading default</Typography>
        <Typography type="h1" size="h1-form">
          H1 heading form default
        </Typography>
        <Typography type="h2">H2 heading</Typography>
        <Typography type="h3">H3 heading</Typography>
        <Typography type="h4">H4 heading</Typography>
        <Typography type="h5">H5 heading</Typography>
        <Typography type="h6" size="h6">
          H6 heading
        </Typography>
        <Typography type="h1" size="h3">
          H1 heading - size h3
        </Typography>
      </Stack>
      
      <Stack direction="column">
         <Typography type="h3" size="h4">
          Default paragraph - light
        </Typography>

        <Typography type="p" fontWeight="light">
          Letné kúpaliská STaRZ Bratislava ukončili sezónu. Všetko dobré sa niekedy končí, ale o rok
          sa na profi čľapkanie, seriózne krauly a všetky ležérne znaky tešíme opäť. Areál zdravia
          Zlaté piesky ostáva otvorený bez výberu vstupného od 9:00 do 22:00, vstup cez predný
          hlavný vchod.
          <br />
          <br />
          <a href="/" className="text-black">
            Hypertext link
          </a>
        </Typography>
      </Stack>

      <Stack direction="column">
        <Typography type="h3" size="h4">
          Default paragraph - normal
        </Typography>
        <Typography type="p">
          Letné kúpaliská STaRZ Bratislava ukončili sezónu. Všetko dobré sa niekedy končí, ale o rok
          sa na profi čľapkanie, seriózne krauly a všetky ležérne znaky tešíme opäť. Areál zdravia
          Zlaté piesky ostáva otvorený bez výberu vstupného od 9:00 do 22:00, vstup cez predný
          hlavný vchod.
          <br />
          <br />
          <a href="/" className="text-black">
            Hypertext link
          </a>
        </Typography>
      </Stack>
      
      <Stack direction="column">
        <Typography type="h3" size="h4">
          Default paragraph - medium
        </Typography>

        <Typography type="p" fontWeight="medium">
          Letné kúpaliská STaRZ Bratislava ukončili sezónu. Všetko dobré sa niekedy končí, ale o rok
          sa na profi čľapkanie, seriózne krauly a všetky ležérne znaky tešíme opäť. Areál zdravia
          Zlaté piesky ostáva otvorený bez výberu vstupného od 9:00 do 22:00, vstup cez predný
          hlavný vchod.
          <br />
          <br />
          <a href="/" className="text-black">
            Hypertext link
          </a>
        </Typography>
      </Stack>
      
      <Stack direction="column">
        <Typography type="h3" size="h4">
          Default paragraph - semibold
        </Typography>

        <Typography type="p" fontWeight="semibold">
          Letné kúpaliská STaRZ Bratislava ukončili sezónu. Všetko dobré sa niekedy končí, ale o rok
          sa na profi čľapkanie, seriózne krauly a všetky ležérne znaky tešíme opäť. Areál zdravia
          Zlaté piesky ostáva otvorený bez výberu vstupného od 9:00 do 22:00, vstup cez predný
          hlavný vchod.
          <br />
          <br />
          <a href="/" className="text-black">
            Hypertext link
          </a>
        </Typography>
      </Stack>
      
      <Stack direction="column">
        <Typography type="h3" size="h4">
          Small paragraph - light
        </Typography>

        <Typography type="p" size="p-small" fontWeight="light">
          Letné kúpaliská STaRZ Bratislava ukončili sezónu. Všetko dobré sa niekedy končí, ale o rok
          sa na profi čľapkanie, seriózne krauly a všetky ležérne znaky tešíme opäť. Areál zdravia
          Zlaté piesky ostáva otvorený bez výberu vstupného od 9:00 do 22:00, vstup cez predný
          hlavný vchod.
          <br />
          <br />
          <a href="/" className="text-black">
            Hypertext link
          </a>
        </Typography>
      </Stack>
      
      <Stack direction="column">
        <Typography type="h3" size="h4">
          Small paragraph - normal
        </Typography>

        <Typography type="p" size="p-small">
          Letné kúpaliská STaRZ Bratislava ukončili sezónu. Všetko dobré sa niekedy končí, ale o rok
          sa na profi čľapkanie, seriózne krauly a všetky ležérne znaky tešíme opäť. Areál zdravia
          Zlaté piesky ostáva otvorený bez výberu vstupného od 9:00 do 22:00, vstup cez predný
          hlavný vchod.
          <br />
          <br />
          <a href="/" className="text-black">
            Hypertext link
          </a>
        </Typography>
      </Stack>
      
      <Stack direction="column">
        <Typography type="h3" size="h4">
          Small paragraph - medium
        </Typography>

        <Typography type="p" size="p-small" fontWeight="medium">
          Letné kúpaliská STaRZ Bratislava ukončili sezónu. Všetko dobré sa niekedy končí, ale o rok
          sa na profi čľapkanie, seriózne krauly a všetky ležérne znaky tešíme opäť. Areál zdravia
          Zlaté piesky ostáva otvorený bez výberu vstupného od 9:00 do 22:00, vstup cez predný
          hlavný vchod.
          <br />
          <br />
          <a href="/" className="text-black">
            Hypertext link
          </a>
        </Typography>
      </Stack>

      <Stack direction='column'>
        <Typography type="h3" size="h4">
          Small paragraph - semibold
        </Typography>

        <Typography type="p" size="p-small" fontWeight="semibold">
          Letné kúpaliská STaRZ Bratislava ukončili sezónu. Všetko dobré sa niekedy končí, ale o rok
          sa na profi čľapkanie, seriózne krauly a všetky ležérne znaky tešíme opäť. Areál zdravia
          Zlaté piesky ostáva otvorený bez výberu vstupného od 9:00 do 22:00, vstup cez predný
          hlavný vchod.
          <br />
          <br />
          <a href="/" className="text-black">
            Hypertext link
          </a>
        </Typography>
      </Stack>

      <Stack direction='column'>
        <Typography type="h3" size="h4">
          Large paragraph - light
        </Typography>

        <Typography type="p" size="p-large" fontWeight="light">
          Letné kúpaliská STaRZ Bratislava ukončili sezónu. Všetko dobré sa niekedy končí, ale o rok
          sa na profi čľapkanie, seriózne krauly a všetky ležérne znaky tešíme opäť. Areál zdravia
          Zlaté piesky ostáva otvorený bez výberu vstupného od 9:00 do 22:00, vstup cez predný
          hlavný vchod.
          <br />
          <br />
          <a href="/" className="text-black">
            Hypertext link
          </a>
        </Typography>
      </Stack>

      <Stack direction='column'>
        <Typography type="h3" size="h4">
          Large paragraph - normal
        </Typography>

        <Typography type="p" size="p-large">
          Letné kúpaliská STaRZ Bratislava ukončili sezónu. Všetko dobré sa niekedy končí, ale o rok
          sa na profi čľapkanie, seriózne krauly a všetky ležérne znaky tešíme opäť. Areál zdravia
          Zlaté piesky ostáva otvorený bez výberu vstupného od 9:00 do 22:00, vstup cez predný
          hlavný vchod.
          <br />
          <br />
          <a href="/" className="text-black">
            Hypertext link
          </a>
        </Typography>
      </Stack>

      <Stack direction='column'>
        <Typography type="h3" size="h4">
          Large paragraph - medium
        </Typography>

        <Typography type="p" size="p-large" fontWeight="medium">
          Letné kúpaliská STaRZ Bratislava ukončili sezónu. Všetko dobré sa niekedy končí, ale o rok
          sa na profi čľapkanie, seriózne krauly a všetky ležérne znaky tešíme opäť. Areál zdravia
          Zlaté piesky ostáva otvorený bez výberu vstupného od 9:00 do 22:00, vstup cez predný
          hlavný vchod.
          <br />
          <br />
          <a href="/" className="text-black">
            Hypertext link
          </a>
        </Typography>
      </Stack>

      <Stack direction='column'>
        <Typography type="h3" size="h4">
          Large paragraph - semibold
        </Typography>

        <Typography type="p" size="p-large" fontWeight="semibold">
          Letné kúpaliská STaRZ Bratislava ukončili sezónu. Všetko dobré sa niekedy končí, ale o rok
          sa na profi čľapkanie, seriózne krauly a všetky ležérne znaky tešíme opäť. Areál zdravia
          Zlaté piesky ostáva otvorený bez výberu vstupného od 9:00 do 22:00, vstup cez predný
          hlavný vchod.
          <br />
          <br />
          <a href="/" className="text-black">
            Hypertext link
          </a>
        </Typography>
      </Stack>
    </Wrapper>
  )
}

export default TypographyShowcase
