import { Component, OnInit } from '@angular/core';
import {NotebookService} from '../notebook.service';

/**
 * Navigation tree for selecting individual notes.
 */
@Component({
  selector: 'app-notebook-tree',
  templateUrl: './notebook-tree.component.html',
  styleUrls: ['./notebook-tree.component.less']
})
export class NotebookTreeComponent implements OnInit {
  constructor(public readonly notebookService: NotebookService) {
  }

  ngOnInit(): void {
  }
}
