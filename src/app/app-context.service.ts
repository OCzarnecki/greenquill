import { Injectable } from '@angular/core';
import {Folder} from './model/folder';

/**
 * Service for sharing global editor state.
 */
@Injectable({
  providedIn: 'root'
})
export class AppContextService {
  constructor() { }

  /**
   * The folder that is currently active. By default, operations will be performed on this folder.
   */
  public selectedFolder: Folder
}
