import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FakeSongService } from 'src/app/services/fake-song.service';

@Component({
  selector: 'app-update-song',
  templateUrl: './update-song.component.html',
  styleUrls: ['./update-song.component.css']
})
export class UpdateSongComponent implements OnInit {

  song:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fakeSong:FakeSongService
  ) {
    this.song=data.Element.songName
   }

  ngOnInit(): void {
  }

  submit(songData:any){
    // console.log(songData.value.)
    this.fakeSong.updateSongs(this.data.Element.id,songData.value.songName)
  }
}
