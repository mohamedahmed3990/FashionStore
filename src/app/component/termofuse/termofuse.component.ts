import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-termofuse',
  standalone: true,
  imports: [],
  templateUrl: './termofuse.component.html',
  styleUrl: './termofuse.component.css'
})
export class TermofuseComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
