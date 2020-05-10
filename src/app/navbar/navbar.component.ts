import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {KeybindingService} from '../keybinding.service';
import {NotebookService} from '../notebook.service';
import {AppContextService} from '../app-context.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('newNoteDialog') newNoteDialog: ElementRef;
  @ViewChild('newNoteNameInput') newNoteNameInput: ElementRef;
  newNoteName: string;

  constructor(
    private keybindingService: KeybindingService,
    private notebookService: NotebookService,
    private appContextService: AppContextService
  ) {
    keybindingService.registerKeybinding('n', () => this.openAddNotePopup(), false, true, false);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.hideAddNotePopup();
  }

  /**
   * Opens the popup to create a new note.
   * TODO this logic should be moved into its own class
   */
  openAddNotePopup() {
    this.newNoteDialog.nativeElement.hidden = false;
    this.newNoteNameInput.nativeElement.focus();
    this.newNoteName = '';
  }

  onKeyDown($event: KeyboardEvent) {
    if ($event.key == 'Enter') {
      this.createNewNote();
    } else if ($event.key == 'Escape') {
      this.hideAddNotePopup();
    }
  }

  createNewNote() {
    this.hideAddNotePopup();
    console.debug('Create new note with name: ' + this.newNoteName);
    const folder = this.appContextService.selectedFolder
    if (folder) {
      this.notebookService.createNote(this.newNoteName.trim(), folder);
    } else {
      console.debug('Cannot create note: no folder selected')
    }
  }

  hideAddNotePopup() {
    this.newNoteDialog.nativeElement.hidden = true;
  }
}
