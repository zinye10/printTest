import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConstructComponent } from './construct/construct.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ConstructComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'constructTest';
}
