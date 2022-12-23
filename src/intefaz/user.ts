export class User {
    name: string;
    phone: string;
    thumb: string;
    email: string;

    public data(){
        return this.name+' '+this.phone;
    }
} 