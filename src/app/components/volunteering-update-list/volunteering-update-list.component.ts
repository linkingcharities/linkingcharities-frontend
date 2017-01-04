import { Component } from '@angular/core';
import { VolunteeringService } from '../../services/volunteering.service';
import { Opportunity } from '../../constants/data-types';
import { Router } from '@angular/router';


@Component({
  selector: 'volunteering-update-list',
  templateUrl: './volunteering-update-list.component.html',
  styleUrls: ['./volunteering-update-list.component.css']
})

export class VolunteeringUpdateListComponent {

  opportunities: Opportunity[] = null;

  private subscription: any;

  constructor(private volunteeringService: VolunteeringService,
    private router: Router) {
    this.subscription = this.volunteeringService.opportunities$
      .subscribe(opportunities => {
      this.opportunities = opportunities;
    });
  }

  ngOnInit() {
    if (!localStorage.getItem("charity")) {
      this.router.navigate(['/home']);
    } else {
      this.volunteeringService.getOpportunitiesForCharity(parseInt(localStorage.getItem("charityID")));
    }
  }

  onEdit(id: number): void {
    this.router.navigate(['/edit-opportunity', id]);
  }

  onDelete(id: number, charity_id: number): void {
    if (confirm("Are you sure you wish to delete this?")) {
      this.volunteeringService.deleteOpportunity(id, charity_id);
    }
  }

  goBack():void {
      this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
