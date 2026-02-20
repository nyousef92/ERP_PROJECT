import { Component } from '@angular/core';
import { SidebarComponent } from '../../../layout/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [RouterOutlet, SidebarComponent],
    templateUrl: './home.component.html'
})
export class HomeComponent {

}
