import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'volunteering-form',
    templateUrl: './volunteering-form.component.html',
    styleUrls: ['./volunteering-form.component.css']
})

export class VolunteeringFormComponent {
    name:string;
    description:string;
    start_date:string;
    end_date:string;
    url:string;

    constructor() {

    }

    ngOnInit(): void{

    }

    onSubmit(): void {
        let data = {
            name: this.name,
            description: this.description,
            start_date: this.start_date,
            end_date: this.end_date,
            url: this.url
        };
        //this.authService.registerOpportunity(data);
    }
}
