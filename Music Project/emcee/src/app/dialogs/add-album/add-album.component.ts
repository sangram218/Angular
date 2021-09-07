import { Component, OnInit } from '@angular/core';
import { FakeArtistService } from 'src/app/services/fake-artist.service';
import { FakeAlbumService } from 'src/app/services/fake-album.service';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {

  artists:any[]=[]
  isNotAdd:boolean=true;

  constructor(private fakeArtist:FakeArtistService,
    private fakeAlbum:FakeAlbumService,
    private artistService:ArtistService,
    private albumService:AlbumService
    ) {
    // this.artists=fakeArtist.getArtists()
    this.artistService.getArtists().subscribe(data=>{
      console.log(data)
      this.artists=data
    })
   }

  ngOnInit(): void {
  }

  submit(data:any){
    this.isNotAdd=false
    // this.fakeAlbum.addAlbums(data.value)
    this.albumService.createAlbums(data.value)
    .subscribe(data=>{
      console.log(data)
    })
  }

}
