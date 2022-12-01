export default `<?xml version="1.0" encoding="utf-8"?>
<xs:schema elementFormDefault="qualified" xmlns="http://schemas.gov.sk/doc/eform/form/0.1" xmlns:xs="http://www.w3.org/2001/XMLSchema" targetNamespace="http://schemas.gov.sk/doc/eform/form/0.1">
  <xs:element name="E-form">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="Meta" type="E-formMetaType"/>
        <xs:element name="Body" type="E-formBodyType">
          
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

  <xs:complexType name="E-formMetaType">
    <xs:annotation>
      <xs:documentation>Metaúdaje elektronického formulára</xs:documentation>
    </xs:annotation>
    <xs:sequence>
      <xs:element name="ID" type="xs:string"/>
      <xs:element name="Name" type="xs:string"/>
      <xs:element name="Description" type="xs:string" minOccurs="0"/>
      <xs:element name="Gestor" type="xs:string"/>
      <xs:element name="RecipientId" type="xs:string"/>
      <xs:element name="Version" type="xs:string"/>
      <xs:element name="ZepRequired" type="xs:boolean"/>
      <xs:element name="EformUuid" type="xs:string"/>
      <xs:element name="SenderID" type="xs:string" default="mailto:"/>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="EnumerationType">
    <xs:annotation>
      <xs:documentation>Položka číselníka</xs:documentation>
    </xs:annotation>
    <xs:sequence>
      <xs:element name="Code" type="xs:string">
        <xs:annotation>
          <xs:documentation>Kód</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="Name" type="xs:string">
        <xs:annotation>
          <xs:documentation>Názov</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="WsEnumCode" type="xs:string">
        <xs:annotation>
          <xs:documentation>Kod ciselnika WS sluzby</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
  </xs:complexType>

  <xs:complexType name="PrilohaType">
    <xs:annotation>
      <xs:documentation>Priložená príloha</xs:documentation>
    </xs:annotation>
    <xs:sequence>
      <xs:element name="Nazov" type="xs:string">
        <xs:annotation>
          <xs:documentation>Názov</xs:documentation>
        </xs:annotation>
      </xs:element>
      <xs:element name="Prilozena" type="xs:boolean">
        <xs:annotation>
          <xs:documentation>Indikátor či bola príloha priložená</xs:documentation>
        </xs:annotation>
      </xs:element>
    </xs:sequence>
  </xs:complexType>

<xs:simpleType name="ZiatetelTypType"><xs:restriction base="xs:string"><xs:enumeration value="Fyzická osoba"/><xs:enumeration value="Fyzická osoba - podnikateľ"/><xs:enumeration value="Právnicka osoba"/></xs:restriction></xs:simpleType><xs:simpleType name="ZiadatelMenoPriezviskoType"><xs:restriction base="xs:string"><xs:pattern value=".*[ ].*"/></xs:restriction></xs:simpleType><xs:simpleType name="ZiadatelTelefonType"><xs:restriction base="xs:string"><xs:pattern value="((([+][1-9])|([+][1-9][0-9]{1,8}))|((00[1-9])|(00[1-9][0-9]{1,7})))"/></xs:restriction></xs:simpleType><xs:complexType name="ZiadatelType"><xs:sequence><xs:element name="ZiatetelTyp" type="ZiatetelTypType" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelMenoPriezvisko" type="ZiadatelMenoPriezviskoType" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelObchodneMeno" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelIco" type="xs:integer" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelAdresaPobytu" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelMiestoPodnikania" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelAdresaSidla" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelMesto" type="EnumerationType" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelPsc" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelKontaktnaOsoba" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelEmail" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelTelefon" type="ZiadatelTelefonType" minOccurs="0" maxOccurs="1"/></xs:sequence></xs:complexType><xs:simpleType name="InvestorTypType"><xs:restriction base="xs:string"><xs:enumeration value="Fyzická osoba"/><xs:enumeration value="Fyzická osoba - podnikateľ"/><xs:enumeration value="Právnicka osoba"/></xs:restriction></xs:simpleType><xs:simpleType name="InvestorMenoPriezviskoType"><xs:restriction base="xs:string"><xs:pattern value=".*[ ].*"/></xs:restriction></xs:simpleType><xs:simpleType name="InvestorTelefonType"><xs:restriction base="xs:string"><xs:pattern value="((([+][1-9])|([+][1-9][0-9]{1,8}))|((00[1-9])|(00[1-9][0-9]{1,7})))"/></xs:restriction></xs:simpleType><xs:complexType name="InvestorType"><xs:sequence><xs:element name="InvestorZiadatelom" type="xs:boolean" minOccurs="0" maxOccurs="1"/><xs:element name="Splnomocnenie" type="PrilohaType" minOccurs="0" maxOccurs="unbounded"/><xs:element name="InvestorTyp" type="InvestorTypType" minOccurs="0" maxOccurs="1"/><xs:element name="InvestorMenoPriezvisko" type="InvestorMenoPriezviskoType" minOccurs="0" maxOccurs="1"/><xs:element name="InvestorObchodneMeno" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="InvestorIco" type="xs:integer" minOccurs="0" maxOccurs="1"/><xs:element name="InvestorAdresaPobytu" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="InvestorMiestoPodnikania" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="InvestorAdresaSidla" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="InvestorMesto" type="EnumerationType" minOccurs="0" maxOccurs="1"/><xs:element name="InvestorPsc" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="InvestorKontaktnaOsoba" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="InvestorEmail" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="InvestorTelefon" type="InvestorTelefonType" minOccurs="0" maxOccurs="1"/></xs:sequence></xs:complexType><xs:simpleType name="ProjektantMenoPriezviskoType"><xs:restriction base="xs:string"><xs:pattern value=".*[ ].*"/></xs:restriction></xs:simpleType><xs:simpleType name="ProjektantTelefonType"><xs:restriction base="xs:string"><xs:pattern value="((([+][1-9])|([+][1-9][0-9]{1,8}))|((00[1-9])|(00[1-9][0-9]{1,7})))"/></xs:restriction></xs:simpleType><xs:complexType name="ProjektantType"><xs:sequence><xs:element name="ProjektantMenoPriezvisko" type="ProjektantMenoPriezviskoType" minOccurs="1" maxOccurs="1"/><xs:element name="ProjektantEmail" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="ProjektantTelefon" type="ProjektantTelefonType" minOccurs="1" maxOccurs="1"/><xs:element name="AutorizacneOsvedcenie" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="DatumSpracovania" type="xs:date" minOccurs="1" maxOccurs="1"/></xs:sequence></xs:complexType><xs:simpleType name="StavbaDruhType"><xs:restriction base="xs:string"><xs:enumeration value="Bytový dom"/><xs:enumeration value="Rodinný dom"/><xs:enumeration value="Iná budova na bývanie"/><xs:enumeration value="Nebytová budova"/><xs:enumeration value="Inžinierska stavba"/><xs:enumeration value="Iné"/></xs:restriction></xs:simpleType><xs:complexType name="StavbaType"><xs:sequence><xs:element name="StavbaNazov" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="StavbaDruh" type="StavbaDruhType" minOccurs="1" maxOccurs="1"/><xs:element name="StavbaUlica" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="StavbaSupisneCislo" type="xs:integer" minOccurs="0" maxOccurs="1"/><xs:element name="StavbaParcela" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="StavbaKataster" type="xs:string" minOccurs="1" maxOccurs="unbounded"/></xs:sequence></xs:complexType><xs:simpleType name="KonanieTypType"><xs:restriction base="xs:string"><xs:enumeration value="Územné konanie"/><xs:enumeration value="Územné konanie o zmene dokončenej stavby"/><xs:enumeration value="Územné konanie o zmene stavby pred dokončením"/><xs:enumeration value="Konanie o dodatočnom povolení stavby"/><xs:enumeration value="Konanie o dodatočnom povolení zmeny dokončenej stavby"/><xs:enumeration value="Konanie o dodatočnom povolení zmeny stavby pred dokončením"/></xs:restriction></xs:simpleType><xs:simpleType name="ZiadostOdovodnenieType"><xs:restriction base="xs:string"><xs:enumeration value="Stavba bola zrealizovaná bez stavebného povolenia"/><xs:enumeration value="Stavba bola zrealizovaná nad rámec vydaného stavebného povolenia"/><xs:enumeration value="Iné"/></xs:restriction></xs:simpleType><xs:complexType name="KonanieType"><xs:sequence><xs:element name="KonanieTyp" type="KonanieTypType" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadostOdovodnenie" type="ZiadostOdovodnenieType" minOccurs="0" maxOccurs="1"/><xs:element name="StavbaFotodokumentacia" type="PrilohaType" minOccurs="0" maxOccurs="unbounded"/><xs:element name="StavbaPisomnosti" type="PrilohaType" minOccurs="0" maxOccurs="unbounded"/></xs:sequence></xs:complexType><xs:complexType name="PrilohyType"><xs:sequence><xs:element name="ProjektovaDokumentacia" type="PrilohaType" minOccurs="1" maxOccurs="unbounded"/><xs:element name="Vykresy" type="PrilohaType" minOccurs="0" maxOccurs="unbounded"/><xs:element name="UlicnyPohlad" type="PrilohaType" minOccurs="0" maxOccurs="unbounded"/><xs:element name="PodzemnePodlazie" type="PrilohaType" minOccurs="0" maxOccurs="unbounded"/><xs:element name="VyjadrenieUradu" type="PrilohaType" minOccurs="0" maxOccurs="unbounded"/></xs:sequence></xs:complexType><xs:complexType name="E-formBodyType"><xs:sequence><xs:element name="Ziadatel" type="ZiadatelType" minOccurs="1" maxOccurs="1"/><xs:element name="Investor" type="InvestorType" minOccurs="1" maxOccurs="1"/><xs:element name="Projektant" type="ProjektantType" minOccurs="1" maxOccurs="1"/><xs:element name="Stavba" type="StavbaType" minOccurs="1" maxOccurs="1"/><xs:element name="Konanie" type="KonanieType" minOccurs="1" maxOccurs="1"/><xs:element name="Prilohy" type="PrilohyType" minOccurs="1" maxOccurs="1"/></xs:sequence></xs:complexType></xs:schema>`
