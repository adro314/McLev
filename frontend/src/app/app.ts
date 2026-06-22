import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Heading } from './components/heading/heading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Heading],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
