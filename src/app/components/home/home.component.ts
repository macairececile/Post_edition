import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  is_checked: boolean = false;

  constructor(private router: Router){}

  goToPage(): void {
    // @ts-ignore
    if(this.is_checked) {
      this.router.navigate(['post-edition']);
    }
  };

  toggleEditable(event: Event) {
    // @ts-ignore
    if (event.target.checked) {
      this.is_checked = true;
    }
  }
}

