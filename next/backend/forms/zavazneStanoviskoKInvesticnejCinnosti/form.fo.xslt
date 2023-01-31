<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xml:lang="en" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:z="http://schemas.gov.sk/doc/eform/form/0.1" version="1.0" xmlns:Xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="/z:E-form">
    <xsl:call-template name="base_eform"/>
  </xsl:template>

  <!-- this is the template which gets called inside the FO structure -->
  <xsl:template name="body">
    
  <xsl:call-template name="base_block_with_title">
            <xsl:with-param name="template_name" select="'ziadatel'"/>
            <xsl:with-param name="title" select="'Žiadateľ'"/>
            <xsl:with-param name="values" select="z:Body/z:Ziadatel"/>
          </xsl:call-template><xsl:call-template name="base_block_with_title">
            <xsl:with-param name="template_name" select="'investor'"/>
            <xsl:with-param name="title" select="'Investor'"/>
            <xsl:with-param name="values" select="z:Body/z:Investor"/>
          </xsl:call-template><xsl:call-template name="base_block_with_title">
            <xsl:with-param name="template_name" select="'projektant'"/>
            <xsl:with-param name="title" select="'Zodpovedný projektant'"/>
            <xsl:with-param name="values" select="z:Body/z:Projektant"/>
          </xsl:call-template><xsl:call-template name="base_block_with_title">
            <xsl:with-param name="template_name" select="'stavba'"/>
            <xsl:with-param name="title" select="'Informácie o stavbe'"/>
            <xsl:with-param name="values" select="z:Body/z:Stavba"/>
          </xsl:call-template><xsl:call-template name="base_block_with_title">
            <xsl:with-param name="template_name" select="'konanie'"/>
            <xsl:with-param name="title" select="'Typ konania na stavebnom úrade'"/>
            <xsl:with-param name="values" select="z:Body/z:Konanie"/>
          </xsl:call-template><xsl:call-template name="base_block_with_title">
            <xsl:with-param name="template_name" select="'prilohy'"/>
            <xsl:with-param name="title" select="'Prílohy'"/>
            <xsl:with-param name="values" select="z:Body/z:Prilohy"/>
          </xsl:call-template></xsl:template>

  <!-- XSL cannot dynamically "yield" template, so here is simple mapping for each template based on name -->
  <!-- TODO better way to do this? -->
  <xsl:template name="map">
    <xsl:param name="template"/>
    <xsl:param name="values"/>

    <xsl:choose>
      
    <xsl:when test="$template = 'ziadatel'">
            <xsl:call-template name="ziadatel">
              <xsl:with-param name="values" select="$values"/>
            </xsl:call-template>
          </xsl:when><xsl:when test="$template = 'investor'">
            <xsl:call-template name="investor">
              <xsl:with-param name="values" select="$values"/>
            </xsl:call-template>
          </xsl:when><xsl:when test="$template = 'projektant'">
            <xsl:call-template name="projektant">
              <xsl:with-param name="values" select="$values"/>
            </xsl:call-template>
          </xsl:when><xsl:when test="$template = 'stavba'">
            <xsl:call-template name="stavba">
              <xsl:with-param name="values" select="$values"/>
            </xsl:call-template>
          </xsl:when><xsl:when test="$template = 'konanie'">
            <xsl:call-template name="konanie">
              <xsl:with-param name="values" select="$values"/>
            </xsl:call-template>
          </xsl:when><xsl:when test="$template = 'prilohy'">
            <xsl:call-template name="prilohy">
              <xsl:with-param name="values" select="$values"/>
            </xsl:call-template>
          </xsl:when></xsl:choose>
  </xsl:template>

  <!-- ########################## -->
  <!-- ALL templates below, prefixed with "base_", are format-specific and should not be modified. -->
  <!-- ########################## -->

  <xsl:template name="base_eform">
    <fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
      <fo:layout-master-set>
        <fo:simple-page-master master-name="A4" page-height="842px" page-width="595px" margin-top="10px" margin-bottom="10px" margin-left="10px" margin-right="10px">
          <fo:region-body margin-bottom="20mm"/>
          <fo:region-after region-name="footer" extent="10mm"/>
        </fo:simple-page-master>
        <fo:page-sequence-master master-name="document">
          <fo:repeatable-page-master-alternatives>
            <fo:conditional-page-master-reference master-reference="A4"/>
          </fo:repeatable-page-master-alternatives>
        </fo:page-sequence-master>
      </fo:layout-master-set>
      <fo:page-sequence master-reference="document" font-family="Arial">
        <fo:static-content flow-name="footer">
          <fo:block text-align="end"><fo:page-number/></fo:block>
        </fo:static-content>
        <fo:flow flow-name="xsl-region-body">
          <fo:block font-size="20pt" text-align="center">
            <xsl:value-of select="z:Meta/z:Name"/>
          </fo:block>
          <fo:block color="white">|</fo:block>
          <fo:block/>

          <xsl:call-template name="body"/>

        </fo:flow>
      </fo:page-sequence>
    </fo:root>
  </xsl:template>

  <xsl:template name="base_block_with_title">
    <xsl:param name="template_name"/>
    <xsl:param name="values"/>
    <xsl:param name="title"/>

    <xsl:if test="$title">
      <xsl:call-template name="base_title">
        <xsl:with-param name="title" select="$title"/>
      </xsl:call-template>
    </xsl:if>

    <xsl:call-template name="base_block">
      <xsl:with-param name="template_name" select="$template_name"/>
      <xsl:with-param name="values" select="$values"/>
    </xsl:call-template>
  </xsl:template>

  <xsl:template name="base_block">
    <xsl:param name="template_name"/>
    <xsl:param name="values"/>

    <fo:block margin-left="5mm">
      <xsl:call-template name="map">
        <xsl:with-param name="template" select="$template_name"/>
        <xsl:with-param name="values" select="$values"/>
      </xsl:call-template>
    </fo:block>
  </xsl:template>

  <xsl:template name="base_format_telefonne_cislo">
    <xsl:param name="node"/>

    <xsl:value-of select="concat($node/*[local-name() = 'MedzinarodneVolacieCislo'], ' ')"/>
    <xsl:value-of select="concat($node/*[local-name() = 'Predvolba'], ' ')"/>
    <xsl:value-of select="$node/*[local-name() = 'Cislo']"/>
  </xsl:template>

  <xsl:template name="base_boolean">
    <xsl:param name="bool"/>

    <xsl:choose>
      <xsl:when test="$bool = 'true'">
        <xsl:text>Áno</xsl:text>
      </xsl:when>
      <xsl:when test="$bool = 'false'">
        <xsl:text>Nie</xsl:text>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="base_format_date">
    <xsl:param name="instr"/>
    <!-- YYYY-MM-DD -->
    <xsl:variable name="yyyy">
      <xsl:value-of select="substring($instr,1,4)"/>
    </xsl:variable>
    <xsl:variable name="mm">
      <xsl:value-of select="substring($instr,6,2)"/>
    </xsl:variable>
    <xsl:variable name="dd">
      <xsl:value-of select="substring($instr,9,2)"/>
    </xsl:variable>

    <xsl:value-of select="concat($dd,'.',$mm,'.',$yyyy)"/>
  </xsl:template>

  <xsl:template name="base_format_datetime">
    <xsl:param name="dateTime"/>
    <xsl:variable name="dateTimeString" select="string($dateTime)"/>
    <xsl:choose>
      <xsl:when test="$dateTimeString!= '' and string-length($dateTimeString)>18 and string(number(substring($dateTimeString, 1, 4))) != 'NaN' ">
        <xsl:value-of select="concat(substring($dateTimeString, 9, 2), '.', substring($dateTimeString, 6, 2), '.', substring($dateTimeString, 1, 4),' ', substring($dateTimeString, 12, 2),':', substring($dateTimeString, 15, 2))"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$dateTimeString"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="base_title">
    <xsl:param name="title"/>

    <fo:block margin-left="5mm" margin-top="2mm">
      <fo:block padding-left="2mm">
        <xsl:value-of select="$title"/>
      </fo:block>
    </fo:block>
  </xsl:template>

  <xsl:template name="base_labeled_field">
    <xsl:param name="text"/>
    <xsl:param name="node"/>

    <fo:table space-before="2mm">
      <fo:table-column/>
      <fo:table-column column-width="300px"/>
      <fo:table-body>
        <fo:table-row>
          <fo:table-cell>
            <fo:block>
              <xsl:value-of select="$text"/>
            </fo:block>
          </fo:table-cell>
          <xsl:choose>
            <xsl:when test="$node">
              <fo:table-cell border-width="0.6pt" border-style="solid" background-color="white" padding="1pt">
                <fo:block>
                  <xsl:value-of select="$node"/>
                  <fo:inline color="white">___</fo:inline>
                </fo:block>
              </fo:table-cell>
            </xsl:when>
            <xsl:otherwise>
              <fo:table-cell>
                <fo:block/>
              </fo:table-cell>
            </xsl:otherwise>
          </xsl:choose>
        </fo:table-row>
      </fo:table-body>
    </fo:table>
  </xsl:template>

  <xsl:template name="base_labeled_textarea">
    <xsl:param name="text"/>
    <xsl:param name="node"/>

    <xsl:call-template name="base_labeled_field">
      <xsl:with-param name="text" select="$text"/>
      <xsl:with-param name="node" select="$node"/>
    </xsl:call-template>
  </xsl:template>
<xsl:template name="ziadatel"><xsl:param name="values"/><xsl:if test="$values/z:ZiatetelTyp"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Žiadate ako'"/>
              <xsl:with-param name="node" select="$values/z:ZiatetelTyp"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelMenoPriezvisko"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Meno a priezvisko'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelMenoPriezvisko"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelObchodneMeno"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Obchodné meno'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelObchodneMeno"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelIco"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'IČO'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelIco"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelAdresaPobytu"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Adresa trvalého pobytu'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelAdresaPobytu"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelMiestoPodnikania"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Miesto podnikania'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelMiestoPodnikania"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelAdresaSidla"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Adresa sídla'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelAdresaSidla"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelMesto"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Mesto'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelMesto/z:Name"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelPsc"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'PSČ'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelPsc"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelKontaktnaOsoba"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Kontaktná osoba'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelKontaktnaOsoba"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelEmail"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'E-mail'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelEmail"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadatelTelefon"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Telefónne číslo (v tvare +421...)'"/>
              <xsl:with-param name="node" select="$values/z:ZiadatelTelefon"/>
            </xsl:call-template></xsl:if></xsl:template><xsl:template name="investor"><xsl:param name="values"/><xsl:if test="$values/z:InvestorZiadatelom"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Je investor rovnaká osoba ako žiadateľ?'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_boolean"><xsl:with-param name="bool" select="$values/z:InvestorZiadatelom"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if><xsl:for-each select="$values/z:Splnomocnenie">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Splnomocnenie na zastupovanie'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each><xsl:if test="$values/z:InvestorTyp"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Typ investora'"/>
              <xsl:with-param name="node" select="$values/z:InvestorTyp"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:InvestorMenoPriezvisko"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Meno a priezvisko'"/>
              <xsl:with-param name="node" select="$values/z:InvestorMenoPriezvisko"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:InvestorObchodneMeno"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Obchodné meno'"/>
              <xsl:with-param name="node" select="$values/z:InvestorObchodneMeno"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:InvestorIco"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'IČO'"/>
              <xsl:with-param name="node" select="$values/z:InvestorIco"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:InvestorAdresaPobytu"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Adresa trvalého pobytu'"/>
              <xsl:with-param name="node" select="$values/z:InvestorAdresaPobytu"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:InvestorMiestoPodnikania"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Miesto podnikania'"/>
              <xsl:with-param name="node" select="$values/z:InvestorMiestoPodnikania"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:InvestorAdresaSidla"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Adresa sídla'"/>
              <xsl:with-param name="node" select="$values/z:InvestorAdresaSidla"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:InvestorMesto"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Mesto'"/>
              <xsl:with-param name="node" select="$values/z:InvestorMesto/z:Name"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:InvestorPsc"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'PSČ'"/>
              <xsl:with-param name="node" select="$values/z:InvestorPsc"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:InvestorKontaktnaOsoba"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Kontaktná osoba'"/>
              <xsl:with-param name="node" select="$values/z:InvestorKontaktnaOsoba"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:InvestorEmail"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'E-mail'"/>
              <xsl:with-param name="node" select="$values/z:InvestorEmail"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:InvestorTelefon"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Telefónne číslo (v tvare +421...)'"/>
              <xsl:with-param name="node" select="$values/z:InvestorTelefon"/>
            </xsl:call-template></xsl:if></xsl:template><xsl:template name="projektant"><xsl:param name="values"/><xsl:if test="$values/z:ProjektantMenoPriezvisko"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Meno a priezvisko'"/>
              <xsl:with-param name="node" select="$values/z:ProjektantMenoPriezvisko"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ProjektantEmail"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'E-mail'"/>
              <xsl:with-param name="node" select="$values/z:ProjektantEmail"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ProjektantTelefon"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Telefónne číslo (v tvare +421...)'"/>
              <xsl:with-param name="node" select="$values/z:ProjektantTelefon"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:AutorizacneOsvedcenie"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Číslo autorizačného osvedčenia'"/>
              <xsl:with-param name="node" select="$values/z:AutorizacneOsvedcenie"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:DatumSpracovania"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Dátum spracovania projektovej dokumentácie'"/>
              <xsl:with-param name="node"><xsl:call-template name="base_format_date"><xsl:with-param name="instr" select="$values/z:DatumSpracovania"/></xsl:call-template></xsl:with-param>
            </xsl:call-template></xsl:if></xsl:template><xsl:template name="stavba"><xsl:param name="values"/><xsl:if test="$values/z:StavbaNazov"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Názov stavby/projektu'"/>
              <xsl:with-param name="node" select="$values/z:StavbaNazov"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:StavbaDruh"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Druh stavby'"/>
              <xsl:with-param name="node" select="$values/z:StavbaDruh"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:StavbaUlica"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Ulica'"/>
              <xsl:with-param name="node" select="$values/z:StavbaUlica"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:StavbaSupisneCislo"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Súpisné číslo'"/>
              <xsl:with-param name="node" select="$values/z:StavbaSupisneCislo"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:StavbaParcela"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Parcelné číslo'"/>
              <xsl:with-param name="node" select="$values/z:StavbaParcela"/>
            </xsl:call-template></xsl:if><xsl:for-each select="$values/z:StavbaKataster">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Katastrálne územie'"/>
                <xsl:with-param name="node" select="."/>
              </xsl:call-template>
            </xsl:for-each></xsl:template><xsl:template name="konanie"><xsl:param name="values"/><xsl:if test="$values/z:KonanieTyp"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Typ konania'"/>
              <xsl:with-param name="node" select="$values/z:KonanieTyp"/>
            </xsl:call-template></xsl:if><xsl:if test="$values/z:ZiadostOdovodnenie"><xsl:call-template name="base_labeled_field">
              <xsl:with-param name="text" select="'Upresnenie konania'"/>
              <xsl:with-param name="node" select="$values/z:ZiadostOdovodnenie"/>
            </xsl:call-template></xsl:if><xsl:for-each select="$values/z:StavbaFotodokumentacia">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Fotodokumentácia stavby'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each><xsl:for-each select="$values/z:StavbaPisomnosti">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Relevantné písomnosti súvisiace so stavbou'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each></xsl:template><xsl:template name="prilohy"><xsl:param name="values"/><xsl:for-each select="$values/z:ProjektovaDokumentacia">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Projektová dokumentácia'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each><xsl:for-each select="$values/z:Vykresy">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Iné výkresy situácií'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each><xsl:for-each select="$values/z:UlicnyPohlad">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Uličný pohľad so záberom najbližších stavieb'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each><xsl:for-each select="$values/z:PodzemnePodlazie">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Vyhodnotenie podzemného podlažia pri bytových budovách'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each><xsl:for-each select="$values/z:VyjadrenieUradu">
              <xsl:call-template name="base_labeled_field">
                <xsl:with-param name="text" select="'Vyjadrenie Krajského pamiatkového úradu'"/>
                <xsl:with-param name="node" select="z:Nazov"/>
              </xsl:call-template>
            </xsl:for-each></xsl:template></xsl:stylesheet>