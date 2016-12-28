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
  area_served:string;
}

export class Option {
  o:string;
  a:string;
}

export class Result {
  title:string;
  picture_link:string;
  description:string;
  links:string[];
  link_types:string[];
}

export class Question {
  no:number;
  question:string;
  options:Option[];
}

export class Opportunity {
    id:number;
    name:string;
    charity:number;
    description:string;
    start_date:string;
    end_date:string;
    url:string;
    charity_name:string;
}

export const Image_Hosting = {
  'a0' : '/a0.jpg',
  'a1' : '/a1.jpg',
  'a2' : '/a2.jpg',
  'a3' : '/a3.jpg',
  'a4' : '/a4.jpg',
  'a5' : '/a5.jpg',
  'a6' : '/a6.jpg'
};

export const Quiz_Description = {
  'a0' : 'These types of charities help preserve artistic and cultural heritage \
          as well as celebrate the arts and our history.',
  'a1' : 'Education charities serve students from every age group, \
          pre-school to graduate school and beyond.  Some serve as the \
          educational institutions while focus on making education more accessible and effective.',
  'a2' : 'Health charities cover everything from supporting and treating the sick and disabled, \
          working on cures for deseases, and promoting public awareness of specific health risks.',
  'a3' : 'Community development is the practice of developing the social well- being of local, \
          regional and, sometimes, national communities.',
  'a4' : 'These organizations feed the hungry, provide emergency response during natural disasters, \
          and offer shelter to those in need.',
  'a5' : 'Animal & Environmental Charities focus on ways to promote preservation, \
          appreciation, and sustainable development for the environment and its habitants. ',
  'a6' : 'You got a heart of gold and you prefer charities advocating faith, religion or perhaps\
          aiding the tough veterans at war.'
};

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

export const DefaultTarget
  = new CharityTarget('', 'Target');

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

export const DefaultType
  = new CharityTarget('', 'Type');


export const CharityTypes:CharityType[] = [
  new CharityType('H', 'Advancement of Health/Saving Lives'),
  new CharityType('S', 'Amateur Sport'),
  new CharityType('AN', 'Animals'),
  new CharityType('A', 'Armed Forces'),
  new CharityType('C', 'Arts/Culture/Heritage/Science'),
  new CharityType('D', 'Disability'),
  new CharityType('EC', 'Economic/Community Development/Employment'),
  new CharityType('E', 'Education/Training'),
  new CharityType('EN', 'Environment'),
  new CharityType('G', 'General Charitable Purposes'),
  new CharityType('HR', 'Human Rights/Equality'),
  new CharityType('O', 'Overseas Aid/Famine Relief'),
  new CharityType('P', 'Prevention or Relief of Poverty'),
  new CharityType('RE', 'Recreation'),
  new CharityType('R', 'Religious Activities'),
  new CharityType('OT', 'Other')
];

// For search
export class CharitySearchQuery {
  term:string;
  target:CharityTarget;
  type:CharityType;
}

// Payments
export class Payment {
  amount:number;
  charity:string;
  currency:string;
  date:string;
  username:string;
}

// For volunteering search
export class VolunteeringSearchQuery {
  term:string;
}
