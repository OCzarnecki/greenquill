import { Component, OnInit } from '@angular/core';
import {Folder} from '../model/folder';
import {StorageService} from '../desktop/storage.service';

/**
 * Navigation tree for selecting individual notes.
 */
@Component({
  selector: 'app-notebook-tree',
  templateUrl: './notebook-tree.component.html',
  styleUrls: ['./notebook-tree.component.less']
})
export class NotebookTreeComponent implements OnInit {
  folders: Folder[];
  private storage: StorageService;

  constructor(storage: StorageService) {
    this.storage = storage;
  }

  ngOnInit(): void {
    this.folders = [];
    this.storage.loadNotebook().then(notebook => {
      return this.folders = notebook.folders;
    });
  }

}
