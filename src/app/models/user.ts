import {Contact} from "./contact";

export class User {
    constructor(){
        this.contacts = new Array();
    }
    id?: number;
    firstName?: string;
    lastName?: string;
    birthDate?: Date;
    bio?: string;
    photoUrl?: string;
    isLogged?: boolean;
    job?: string;
    contacts?: Contact[];
}
