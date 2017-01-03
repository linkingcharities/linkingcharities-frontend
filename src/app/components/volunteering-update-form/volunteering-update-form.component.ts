import { Component } from '@angular/core';
import { VolunteeringService } from '../../services/volunteering.service';

@Component({
    selector: 'volunteering-update-form',
    templateUrl: './volunteering-update-form.component.html',
    styleUrls: ['./volunteering-update-form.component.css']
})

export class VolunteeringUpdateFormComponent {
    constructor(private volunteeringService:VolunteeringService) {

    }

    ngOnInit() {

    }
}
