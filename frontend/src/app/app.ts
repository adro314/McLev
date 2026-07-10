import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Heading } from './components/heading/heading';
import { Menu } from './components/menu/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Heading,Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
