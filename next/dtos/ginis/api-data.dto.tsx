export interface RequestGinisBodyDocumentsList {
    state: RequestGinisBodyDocumentsListStates //Stav
    tableId: string // Id-uredni-desky
    // It is possible to have more parameters, for check them go to https://robot.gordic.cz/xrg/Default.html#
}

export enum RequestGinisBodyDocumentsListStates {
    POSTED = 'vyveseno',
    DELETED = 'sejmuto'
}

export interface ResponseGinisDocumentsList {
    "Id-zaznamu": string //id of post of document - use for ID
    Stav: RequestGinisBodyDocumentsListStates 
    Kategorie: string //category
    Nazev: string //name
    Popis: string //description
    "Vyveseno-dne": string //Posted in date (date string YYYY-MM-DD)
    "Sejmuto-dne": string //Deleted in date (date string YYYY-MM-DD) can be in the future
    Zdroj: string //Source or department of document
    Navrhl: string //Person, who propose the document (name and ID)
    Schvalil: string //person who admint the document (name and ID)
    Cj: string //some other ID
    "Pocet-souboru": string //number of posted files
    "Id-dokumentu": string //Id of document
    "Pocet-vyveseno": string //number of posted events
    "Pocet-archiv": string //number of deleted documents
    "Datum-zmeny": string
    "Puvod-dokumentu": string
    "Odesilatel-dokumentu": string
    "Typ-dokumentu": string
    "El-obraz-podpis": string
    "Cj-spisu": string
    "Cislo-sml": string
    "Typ-sml": string
    "Nazev-sml": string
    "Subjekt-sml": string
    "Nazev-sub-sml": string
    "Prijmeni-sub-sml": string
    "Jmeno-sub-sml": string
    "Ico-sub-sml": string
    "Obec-sub-sml": string
    "Ulice-sub-sml": string
    "Cor-sub-sml": string
    "Cpop-sub-sml": string
    "Psc-sub-sml": string
    "Typ-sub-sml": string
    "Datum-uzavreni-sml": string
    "Odbor-sml": string
    "Celkova-castka-sml": string
    "Mena-sml": string
}


export interface RequestGinisBodyDocumentDetail {
    documentId: string
    // It is possible to have more parameters, for check them go to https://robot.gordic.cz/xrg/Default.html#
}

export interface ResponseGinisBodyDocumentDetail {
    "Detail-dokumentu": ResponseGinisBodyDocumentDetailDetail
    "Soubory-dokumentu": ResponseGinisBodyDocumentDetailFile[]
}

export interface ResponseGinisBodyDocumentDetailDetail {
    "Id-zaznamu": string
    Stav: RequestGinisBodyDocumentsListStates
    Kategorie: string
    Nazev: string
    "Vyveseno-dne": string
    "Sejmuto-dne": string
    Zdroj: string
    Navrhl: string
    Schvalil: string
    Cj: string
    "Pocet-souboru": string
    "Id-dokumentu": string
    "Datum-zmeny": string
    "Puvod-dokumentu": string
    "Odesilatel-dokumentu": string
    "Typ-dokumentu": string
    "El-obraz-podpis": string
    "Cj-spisu": string
    "Odbor-sml": string
}

export interface ResponseGinisBodyDocumentDetailFile {
    "Id-souboru": string //file id - use for download file - fileId param
    Nazev: string
    Velikost: string
    "Priznak-el-obr": string
    Poznamka: string
    "Priznak-podpis": string
}

export interface RequestGinisBodyLoadFile {
    fileId: string
}

export interface ResponseGinisBodyLoadFile {
    "Jmeno-souboru": string //file name
    Data: string //base64 string
}