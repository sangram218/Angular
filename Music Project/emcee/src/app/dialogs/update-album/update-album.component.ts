import { Component, OnInit ,Inject} from '@angular/core';
import { FakeAlbumService } from 'src/app/services/fake-album.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-update-album',
  templateUrl: './update-album.component.html',
  styleUrls: ['./update-album.component.css']
})
export class UpdateAlbumComponent implements OnInit {

  album:string;
  id:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fakeAlbum:FakeAlbumService,
    private albumService:AlbumService
  ) { 
    // this.album=data.Element.albumName
    // console.log(data.Element)
    this.albumService.getAlbum(data.Element.id).subscribe(data=>{
      console.log(data)
      this.album=data.albumName
      this.id=data.id
    })
  }

  ngOnInit(): void {
  }

  submit(albumData:any){
    // console.log(artistData)
    // this.fakeAlbum.updateAlbums(this.data.Element.id,albumData.value.albumName)
    this.albumService.updateAlbum(albumData.value,this.id).subscribe(data=>{
      console.log(data);
    })
  }

}
