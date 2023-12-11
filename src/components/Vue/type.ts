export interface ICore {
    components: {
        api: {
            requestToAmoCRM: <T>(url: string, method: RequestMethod, data: any, params: any) => Promise<T>
        }
    }
}

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface DropdownItem {
    title: string,
    value: DropdownValue
}

export type DropdownValue = number | string;