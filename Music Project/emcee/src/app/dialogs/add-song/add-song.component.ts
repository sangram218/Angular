import { Component, OnInit } from '@angular/core';
import { FakeArtistService } from 'src/app/services/fake-artist.service';
import { FakeAlbumService } from 'src/app/services/fake-album.service';
import { FakeSongService } from 'src/app/services/fake-song.service';
import { ArtistService } from 'src/app/services/artist.service';
import { AlbumService } from 'src/app/services/album.service';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {

  artists:any[]=[]
  albums:any[]=[]
  aname:string=""
  isNotAdd:boolean=true;

  constructor(
    private fakeArtist:FakeArtistService,
    private fakeAlbum:FakeAlbumService,
    private fakeSong:FakeSongService,
    private artistService:ArtistService,
    private albumService:AlbumService,
    private songService:SongService
  ) { 
    // this.artists=fakeArtist.getArtists()
    // this.albums=fakeAlbum.getAlbums()
    this.artistService.getArtists().subscribe(data=>{
      this.artists=data
    })
    this.albumService.getAlbums().subscribe(data=>{
      this.albums=data
    })
  }

  ngOnInit(): void {
  }

  submit(data:any){
    this.isNotAdd=false
    // this.fakeSong.addSongs(data.value)
    this.songService.createSongs(data.value).subscribe(data=>{
      console.log(data)
    })
  }

  artistSelected(artistId:any){
    let artistName:string=""
    this.albums=this.fakeAlbum.getAlbums()
    this.artists.map(artist=>{
      if(artist.id==Number(artistId.value)){
        artistName=artist.name
      }
    })
    this.albums = this.albums.filter(album=> album.artistName==artistName)
  }

}
