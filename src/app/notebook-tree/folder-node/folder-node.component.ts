import {Component, Input} from '@angular/core';
import {Folder} from '../../model/folder';
import {AppContextService} from '../../app-context.service';

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

  constructor(private appContextService: AppContextService) {
  }

  onClickFolder(): void {
    this.isOpen = !this.isOpen;
    this.appContextService.selectedFolder = this.folder;
  }

  onClickNote() {
    // note: routing happens via HTML attribute
    this.appContextService.selectedFolder = this.folder
  }

  isSelected(): boolean {
    return this.folder === this.appContextService.selectedFolder
  }
}
