import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {KeybindingService} from '../keybinding.service';
import {NotebookService} from '../notebook.service';

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
    private notebookService: NotebookService
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
    this.notebookService.createNote(this.newNoteName.trim());
  }

  hideAddNotePopup() {
    this.newNoteDialog.nativeElement.hidden = true;
  }
}
