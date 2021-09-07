import { Component, OnInit ,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FakeArtistService } from 'src/app/services/fake-artist.service';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-update-artist',
  templateUrl: './update-artist.component.html',
  styleUrls: ['./update-artist.component.css']
})
export class UpdateArtistComponent implements OnInit {

  artist:string;
  id:any;
  // to access data sent from call use MAT_DIALOG_DATA
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fakeArtist:FakeArtistService,
    private artistService:ArtistService
  ) { 
    // this.artist=data.Element.name
    // console.log(data.Element)
    this.artistService.getArtist(data.Element.id).subscribe(data=>{
      console.log(data)
      this.artist=data.artistName
      this.id=data.id
    })
  }

  ngOnInit(): void {
  }

  submit(artistData:any){
    console.log(artistData.value)
    // console.log(this.data.Element.id)
    // this.fakeArtist.updateArtists(this.data.Element.id,artistData.value.artistName)
    this.artistService.updateArtist(artistData.value,this.id).subscribe(data=>{
      console.log(data);
    })
  }
  

}
