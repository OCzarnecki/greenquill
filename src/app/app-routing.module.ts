import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditorComponent} from './editor/editor.component';

const routes: Routes = [
  {path: 'note/:id', component: EditorComponent},
  {path: '', redirectTo: '/note/001', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
