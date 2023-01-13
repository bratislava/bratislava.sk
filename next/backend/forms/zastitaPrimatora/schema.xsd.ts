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

<xs:simpleType name="ZiatetelTypType"><xs:restriction base="xs:string"><xs:enumeration value="Fyzická osoba"/><xs:enumeration value="Fyzická osoba - podnikateľ"/><xs:enumeration value="Právnicka osoba"/></xs:restriction></xs:simpleType><xs:simpleType name="ZiadatelMenoPriezviskoType"><xs:restriction base="xs:string"><xs:pattern value=".*[ ].*"/></xs:restriction></xs:simpleType><xs:simpleType name="ZiadatelTelefonType"><xs:restriction base="xs:string"><xs:pattern value="((([+][1-9])|([+][1-9][0-9]{1,8}))|((00[1-9])|(00[1-9][0-9]{1,7})))"/></xs:restriction></xs:simpleType><xs:complexType name="ZiadatelType"><xs:sequence><xs:element name="ZiatetelTyp" type="ZiatetelTypType" minOccurs="1" maxOccurs="1"/><xs:element name="ZiadatelMenoPriezvisko" type="ZiadatelMenoPriezviskoType" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelObchodneMeno" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelIco" type="xs:integer" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelAdresaPobytu" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelMiestoPodnikania" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelAdresaSidla" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelMesto" type="EnumerationType" minOccurs="1" maxOccurs="1"/><xs:element name="ZiadatelPsc" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="ZiadatelKontaktnaOsoba" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="ZiadatelEmail" type="xs:string" minOccurs="1" maxOccurs="1"/><xs:element name="ZiadatelTelefon" type="ZiadatelTelefonType" minOccurs="1" maxOccurs="1"/></xs:sequence></xs:complexType><xs:simpleType name="PodujatieTypType"><xs:restriction base="xs:string"><xs:enumeration value="Natáčanie filmu"/><xs:enumeration value="Kultúrne podujatie"/><xs:enumeration value="Charitatívna / verejnoprospešná aktivita"/><xs:enumeration value="Športové podujatie"/><xs:enumeration value="Iné podujatie"/></xs:restriction></xs:simpleType><xs:complexType name="PodujatieInformacieType"><xs:sequence><xs:element name="PodujatieTyp" type="PodujatieTypType" minOccurs="1" maxOccurs="1"/><xs:element name="FilmNazov" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="FilmZaciatokNatacaniaDatum" type="xs:date" minOccurs="0" maxOccurs="1"/><xs:element name="FilmZaciatokNatacaniaCas" type="xs:dateTime" minOccurs="0" maxOccurs="1"/><xs:element name="FilmKoniecNatacaniaDatum" type="xs:date" minOccurs="0" maxOccurs="1"/><xs:element name="FilmKoniecNatacaniaCas" type="xs:dateTime" minOccurs="0" maxOccurs="1"/><xs:element name="FilmMiestoNatacania" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="FilmStab" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="FilmProgram" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="PodujatieNazov" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="PodujatieZaciatokDatum" type="xs:date" minOccurs="0" maxOccurs="1"/><xs:element name="PodujatieZaciatokCas" type="xs:dateTime" minOccurs="0" maxOccurs="1"/><xs:element name="PodujatieKoniecDatum" type="xs:date" minOccurs="0" maxOccurs="1"/><xs:element name="PodujatieKoniecCas" type="xs:dateTime" minOccurs="0" maxOccurs="1"/><xs:element name="PodujatieMiesto" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="PodujatiePocetNavstevnikov" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="PodujatieProgram" type="xs:string" minOccurs="0" maxOccurs="1"/><xs:element name="PodujatieVstupne" type="xs:boolean" minOccurs="0" maxOccurs="1"/><xs:element name="PodujatieCharita" type="xs:boolean" minOccurs="0" maxOccurs="1"/><xs:element name="PodujatieCharitaUpresnenie" type="xs:string" minOccurs="0" maxOccurs="1"/></xs:sequence></xs:complexType><xs:complexType name="PodujatieVyznamType"><xs:sequence><xs:element name="PodujatieVyznamUpresnenie" type="xs:string" minOccurs="1" maxOccurs="1"/></xs:sequence></xs:complexType><xs:simpleType name="UcastPrimatoraTypType"><xs:restriction base="xs:string"><xs:enumeration value="Slávnostné otvorenie"/><xs:enumeration value="Príhovor"/><xs:enumeration value="Hosť na podujatí"/><xs:enumeration value="Diskusia"/><xs:enumeration value="Iné"/></xs:restriction></xs:simpleType><xs:simpleType name="PropagaciaMestoUpresnenieType"><xs:restriction base="xs:string"><xs:enumeration value="Sociálne siete hlavného mesta (Facebook, Instagram)"/><xs:enumeration value="Mestský web bratislava.sk"/><xs:enumeration value="Informačný magazín in.ba"/><xs:enumeration value="Video spot v MHD"/><xs:enumeration value="Citylighty"/></xs:restriction></xs:simpleType><xs:complexType name="PodujatieSpolupracaMestoType"><xs:sequence><xs:element name="ZastitaPrimatora" type="xs:boolean" minOccurs="1" maxOccurs="1"/><xs:element name="UcastPrimatora" type="xs:boolean" minOccurs="1" maxOccurs="1"/><xs:element name="UcastPrimatoraDatum" type="xs:date" minOccurs="0" maxOccurs="1"/><xs:element name="UcastPrimatoraCas" type="xs:dateTime" minOccurs="0" maxOccurs="1"/><xs:element name="UcastPrimatoraTyp" type="UcastPrimatoraTypType" minOccurs="0" maxOccurs="1"/><xs:element name="PropagaciaMesto" type="xs:boolean" minOccurs="1" maxOccurs="1"/><xs:element name="PropagaciaMestoUpresnenie" type="PropagaciaMestoUpresnenieType" minOccurs="0" maxOccurs="1"/></xs:sequence></xs:complexType><xs:simpleType name="ZiadostPodporaOrganizacieUpresnenieType"><xs:restriction base="xs:string"><xs:enumeration value="Bratislavské kultúrne a informačné stredisko (BKIS)"/><xs:enumeration value="Bratislava Tourist Board (BTB)"/><xs:enumeration value="Odvoz a likvidácia odpadu (OLO)"/><xs:enumeration value="Bratislavská vodárenská spoločnosť (BVS)"/><xs:enumeration value="Dopravný podnik Bratislava (DPB)"/><xs:enumeration value="Galéria mesta Bratislava (GMB)"/><xs:enumeration value="Múzeum mesta Bratislava (MMB)"/><xs:enumeration value="Správa telovýchovných a rekreačných zariadení (STARZ)"/><xs:enumeration value="Mestská knižnica"/><xs:enumeration value="Archív mesta Bratislava"/><xs:enumeration value="Iné"/></xs:restriction></xs:simpleType><xs:complexType name="PodujatieSpolupracaOrganizacieType"><xs:sequence><xs:element name="ZiadostPodporaOrganizacie" type="xs:boolean" minOccurs="1" maxOccurs="1"/><xs:element name="ZiadostPodporaOrganizacieUpresnenie" type="ZiadostPodporaOrganizacieUpresnenieType" minOccurs="1" maxOccurs="1"/><xs:element name="ZiadostPodporaMesto" type="xs:boolean" minOccurs="1" maxOccurs="1"/><xs:element name="ZiadostPodporaPartneri" type="xs:string" minOccurs="1" maxOccurs="1"/></xs:sequence></xs:complexType><xs:complexType name="E-formBodyType"><xs:sequence><xs:element name="Ziadatel" type="ZiadatelType" minOccurs="1" maxOccurs="1"/><xs:element name="PodujatieInformacie" type="PodujatieInformacieType" minOccurs="1" maxOccurs="1"/><xs:element name="PodujatieVyznam" type="PodujatieVyznamType" minOccurs="1" maxOccurs="1"/><xs:element name="PodujatieSpolupracaMesto" type="PodujatieSpolupracaMestoType" minOccurs="1" maxOccurs="1"/><xs:element name="PodujatieSpolupracaOrganizacie" type="PodujatieSpolupracaOrganizacieType" minOccurs="1" maxOccurs="1"/></xs:sequence></xs:complexType></xs:schema>`