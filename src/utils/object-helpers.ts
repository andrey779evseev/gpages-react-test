import {UserType} from '../types/types';

// todo if crash replace with any
export const updateObjectInArray = (items: Array<UserType>, itemId: number, objPropName: string, newObjProps: boolean) => {
    return items.map((u: any) => {
        if (u[objPropName] === itemId)
            return {...u, followed : newObjProps}
        return u;
    })
}
