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

export class CharityTarget {
  constructor(public short:string,
              public full:string) {
  }
}

export const CharityTargets:CharityTarget[] = [
  new CharityTarget('C', 'Children / Young People'),
  new CharityTarget('E', 'Elderly / Old People'),
  new CharityTarget('P', 'General public'),
  new CharityTarget('R', 'People of particular ethnic / racial origin'),
  new CharityTarget('D', 'People with disabilities'),
  new CharityTarget('O', 'Other')
];

export class CharityType {
  constructor(public short:string,
              public full:string) {
  }
}

export const CharityTypes:CharityType[] = [
  new CharityType('G', 'General Charitable Purposes'),
  new CharityType('E', 'Education/Training'),
  new CharityType('H', 'Advancement of Health/Saving Lives'),
  new CharityType('D', 'Disability'),
  new CharityType('P', 'Prevention or Relief of Poverty'),
  new CharityType('O', 'Overseas Aid/Famine Relief'),
  new CharityType('R', 'Religious Activities'),
  new CharityType('C', 'Arts/Culture/Heritage/Science'),
  new CharityType('S', 'Amateur Sport'),
  new CharityType('AN', 'Animals'),
  new CharityType('EN', 'Environment'),
  new CharityType('EC', 'Economic/Community Development/Employment'),
  new CharityType('A', 'Armed Forces'),
  new CharityType('HR', 'Human Rights/Equality'),
  new CharityType('RE', 'Recreation'),
  new CharityType('OT', 'Other')
];

