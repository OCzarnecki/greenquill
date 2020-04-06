import {Component, Input} from '@angular/core';
import {Folder} from '../../model/folder';

/**
 * Component for drawing a folder, possibly with its contents.
 */
@Component({
  selector: 'app-folder-node',
  templateUrl: './folder-node.component.html',
  styleUrls: ['./folder-node.component.less']
})
export class FolderNodeComponent {

  @Input() folder: Folder;
  @Input() indent: number;
  isOpen: boolean = false;

  constructor() {
  }

  onClickFolder(): void {
    this.isOpen = !this.isOpen;
  }
}
