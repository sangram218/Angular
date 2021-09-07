import { Component, OnInit } from '@angular/core';
import { FakeArtistService } from 'src/app/services/fake-artist.service';
import { ArtistService } from 'src/app/services/artist.service';


@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css'],
})
export class AddArtistComponent implements OnInit {

  isNotAdd:boolean=true;

  constructor(private fakeArtist:FakeArtistService,
    private artistService:ArtistService
    ) { }

  ngOnInit(): void {
  }

  submit(data:any){
    this.isNotAdd=false
    // this.fakeArtist.addArtists(data.value.artistName)
    this.artistService.createArtists(data.value).subscribe(data => {
      console.log(data)
    })
  }

}
