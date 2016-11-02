export class User {
  constructor(public email:string,
              public password:string,
              public charity:string) {
  }
}

// For the charities
export class Charity {
  id:number;
  register_id:number;
  name:string;
  description:string;
  paypal:string;
}
