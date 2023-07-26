export interface TableButtonAction {
    name: string
    value?: any
}

export enum ActionButtons {
    edit = 'edit',
    delete = 'delete',
    addToList = 'add to list',
    removeFromList = 'remove from list'
}