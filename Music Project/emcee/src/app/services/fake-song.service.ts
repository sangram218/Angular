import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakeSongService {

  deletedIndex:number;
  deletedObject:any;

  Songs:any[]=[
    {
      id: 1,
      artistId:1,
      albumId:1,
      songName: "Goosebumps",
      duration:4.17
  },
  {
      id: 2,
      artistId:1,
      albumId:1,
      songName: "Highest in the room",
      duration:4.27
  },
  {
    id: 3,
    artistId:1,
    albumId:5,
    songName: "Sicko Mode",
    duration:4.37
},
  {
      id: 4,
      artistId:2,
      albumId:2,
      songName: "Not afraid",
      duration:4.51
  },
  {
      id: 5,
      artistId:2,
      albumId:2,
      songName: "Lose yourself",
      duration:3.59
  },
  {
      id: 6,
      artistId:3,
      albumId:3,
      songName: "We own it",
      duration:5.21
  },
  {
    id: 7,
    artistId:4,
    albumId:4,
    songName: "God's plan",
    duration:5.21
},
{
  id: 8,
  artistId:7,
  albumId:6,
  songName: "Gin and Juice",
  duration:4
},
{
  id: 9,
  artistId:7,
  albumId:6,
  songName: "My Family",
  duration:5
},
{
  id: 10,
  artistId:2,
  albumId:2,
  songName: "Till I Collapse",
  duration:4.51
},
{
  id: 11,
  artistId:2,
  albumId:2,
  songName: "Rap God",
  duration:3.59
},
{
  id: 12,
  artistId:6,
  albumId:7,
  songName: "Lollipop",
  duration:3.1
},
{
  id: 13,
  artistId:6,
  albumId:7,
  songName: "Seeing Green",
  duration:4.2
},
  ]

  getSongs(){
    return this.Songs
  }

  addSongs(songData:any){
    // console.log(albumData.artistName,albumData.albumName)
    let ID=0;
    this.Songs.map(Song=>{
      if(Song.id>ID){
        ID=Song.id
      }
    })
    this.Songs.push({id:ID+1,artistId:Number(songData.artistName),albumId:Number(songData.albumName),
      songName:songData.songName,duration:Number(songData.duration)})
    // console.log(this.Albums)
  }
  deleteSongs(songId:any){
    this.Songs.map(Song=>{
      if(Song.id===songId){
        this.deletedIndex=this.Songs.indexOf(Song)
        this.deletedObject=Song
        this.Songs.splice(this.Songs.indexOf(Song),1)
      }
    })
    // console.log(this.Songs)
  }

  onUndo(){
    this.Songs.splice(this.deletedIndex,0,this.deletedObject)
  }

  updateSongs(songId:any,updatedName:any){
    console.log(songId,updatedName)
    this.Songs.map(Song=>{
      if(Song.id===songId){
        Song.songName=updatedName
      }
    })
  }

  constructor() { }
}
