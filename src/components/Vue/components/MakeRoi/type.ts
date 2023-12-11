export interface User {
    id: number,
    name: string,
    group: string
}

export interface Group {
    id: string,
    title: string
}

export interface Pipeline {
    id: number,
    name: string,
    visible: boolean,
    statuses: Status[]
}

export interface Status {
    id: number,
    name: string,
    color: string,
    visible: boolean
}

export interface FieldEntity {
    name: string,
    color: string,
    fields: Field[]
}

export interface Field {
    id: number,
    name: string,
    visible: boolean,
    entity: string
}

export interface TagEntity {
    name: string,
    color: string,
    tags: Tag[]
}

export interface Tag {
    id: number,
    name: string,
    visible: boolean,
    entity: string
}

export interface CustomItem{
    id:number,
    name:string
}