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
  type:string;
  target:string;
}

export const Charity_Target = {
  'C': 'Children / Young People',
  'E': 'Elderly / Old People',
  'D': 'People with disabilities',
  'R': 'People of particular ethnic / racial origin',
  'P': 'General public',
  'O': 'Other'
};

export const Charity_Type = {
  'G': 'General Charitable Purposes',
  'E': 'Education/Training',
  'H': 'Advancement of Health/Saving Lives',
  'D': 'Disability',
  'P': 'Prevention or Relief of Poverty',
  'O': 'Overseas Aid/Famine Relief',
  'R': 'Religious Activities',
  'C': 'Arts/Culture/Heritage/Science',
  'S': 'Amateur Sport',
  'AN': 'Animals',
  'EN': 'Environment',
  'EC': 'Economic/Community Development/Employment',
  'A': 'Armed Forces',
  'HR': 'Human Rights/Equality',
  'RE': 'Recreation',
  'OT': 'Other'
};
