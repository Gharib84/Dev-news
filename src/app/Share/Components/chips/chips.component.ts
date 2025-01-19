import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAtom } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chips',
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.css'
})
export class ChipsComponent {
  faAtom = faAtom;
  programmingLanguages:string[] = [
    "Angular",
    "Python",
    "Typescript",
    "Node",
    "Symfony",
    "React",
    "Docker",
  ]
}
