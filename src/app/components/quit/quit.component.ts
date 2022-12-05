import { Component } from '@angular/core';
import {Router} from "@angular/router";


@Component({
    selector: 'app-home',
    templateUrl: './quit.component.html',
    styleUrls: ['./quit.component.css']
})

export class Quit {
    constructor(private router: Router){}
}

