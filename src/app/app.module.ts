import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { NotebookTreeComponent } from './notebook-tree/notebook-tree.component';
import { FolderNodeComponent } from './notebook-tree/folder-node/folder-node.component';
import { AppRoutingModule } from './app-routing.module';
import { EditorComponent } from './editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    NotebookTreeComponent,
    FolderNodeComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
