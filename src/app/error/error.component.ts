import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {
  }

  error = this.route.snapshot.params['code'];

  ngOnInit() {
    switch (this.error) {
      case '1':
        this.error = `Cant connect to database`;
        break;
      case '2':
        this.error = `Module not response`;
        break;
      case '3':
        this.error = `Statistic by this room is empty`;
        break;
      case '4':
        this.error = `Bad response from module`;
        break;
      case '5':
        this.error = `Sorry. We have not rooms in database`;
        break;
      default:
        this.error = `Oops. Unknown error`;

    }
  }

  goToHomePage() {
    this.router.navigateByUrl(`/`);
  }
}
