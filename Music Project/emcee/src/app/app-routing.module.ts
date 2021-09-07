import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { SongComponent } from './song/song.component';

const routes: Routes = [
  {
    path: 'album',
    component: AlbumComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'artist/:artistName',
    component: ArtistComponent
  },
  {
    path: 'artist',
    component: ArtistComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'song',
    component: SongComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'no-access',
    component: NoAccessComponent
  },
  // {
  //   path: '',
  //   component: AppComponent
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
