export interface TimeActivity {
    color: string,
    overall: number,
    time?: string,
}
export interface ActivityItem {
    account_id: number,
    user_id: number,
    created_at: number,
    duration: number,
    type: number,
    time?: {
        color: string,
        label: string,
        name: string,
        part: number,
        start: number
    }
}
export interface Groups {
    id: number,
    name: string
}
export interface Users {
    name: string,
    id: number,
    group_id: number,
    activities: ActivityItem[]
}
export interface ActivityTypes {
    name: string,
    id: number
}
export interface Info {
    groups: Groups[],
    users: Users[].
    activity_types: ActivityTypes[]
}