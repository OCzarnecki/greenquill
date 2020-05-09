import { Component, OnInit } from '@angular/core';
import {Folder} from '../model/folder';
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
  folders: readonly Folder[];

  constructor(notebookService: NotebookService) {
    this.folders = [];
    notebookService.notebook$.subscribe(notebook => {
      if (notebook) {
        this.folders = notebook.folders;
      }
    });
  }

  ngOnInit(): void {
  }
}
