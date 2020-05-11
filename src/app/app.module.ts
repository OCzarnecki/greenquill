import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {NotebookTreeComponent} from './notebook-tree/notebook-tree.component';
import {FolderNodeComponent} from './notebook-tree/folder-node/folder-node.component';
import {AppRoutingModule} from './app-routing.module';
import {EditorComponent} from './editor/editor.component';
import {NavbarComponent} from './navbar/navbar.component';
import {NotebookService} from './notebook.service';
import {StorageService} from './desktop/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    NotebookTreeComponent,
    FolderNodeComponent,
    EditorComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    // note: the order of initializers matters here!
    {
      provide: APP_INITIALIZER,
      useFactory: (storageService: StorageService) => () => {
        return storageService.init();
      },
      deps: [StorageService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (notebookService: NotebookService) => () => {
        return notebookService.init();
      },
      deps: [NotebookService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
