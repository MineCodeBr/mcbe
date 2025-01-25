
export type CommumComponent = {
    name: string,
    state: object | string
}

export type CommumEvent = {
    "id": string,
    "option": { name: string | boolean | undefined, tickTime?: number, looping?: boolean },
    callback: (ev: any) => void
}

export type CategoryCreative = "Items" | "Construction" | "Nature"