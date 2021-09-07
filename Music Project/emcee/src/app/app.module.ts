import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { SongComponent } from './song/song.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import { AddArtistComponent } from './dialogs/add-artist/add-artist.component';
import { AddAlbumComponent } from './dialogs/add-album/add-album.component';
import { AddSongComponent } from './dialogs/add-song/add-song.component';
import { UpdateArtistComponent } from './dialogs/update-artist/update-artist.component';
import { UpdateAlbumComponent } from './dialogs/update-album/update-album.component';
import { FilterSongComponent } from './dialogs/filter-song/filter-song.component';
import { UpdateSongComponent } from './dialogs/update-song/update-song.component';
import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ArtistComponent,
    AlbumComponent,
    SongComponent,
    AddArtistComponent,
    AddAlbumComponent,
    AddSongComponent,
    UpdateArtistComponent,
    UpdateAlbumComponent,
    FilterSongComponent,
    UpdateSongComponent,
    LoginComponent,
    NoAccessComponent,
  ],
  entryComponents:[AddArtistComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule, 
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
