import { Injectable } from '@angular/core';
import { FakeArtistService } from './fake-artist.service';
import { FakeSongService } from './fake-song.service';

@Injectable({
  providedIn: 'root'
})
export class FakeAlbumService {

  artists:any[]=[]
  modifiedAlbumData:{id:number,artistName:string,albumName:string,duration:number}[]=[]
  deletedIndex:number;
  deletedObject:any;

  constructor(private fakeSong:FakeSongService,
    private fakeArtists:FakeArtistService) { }

  Albums:any[]=[
    {
      id:1,
      artistId:1,
      albumName:"Astroworld",
      duration:0
  },
  {
      id:2,
      artistId:2,
      albumName:"The Real Slim Shady",
      duration:0
  },
  {
      id:3,
      artistId:3,
      albumName:"Rolling Papers",
      duration:0
  },
  {
    id:4,
    artistId:4,
    albumName:"Scorpion",
    duration:0
},
{
  id:5,
  artistId:1,
  albumName:"Astroworld1",
  duration:0
},
{
  id:6,
  artistId:7,
  albumName:"I Wanna Thank Me",
  duration:0
},
{
  id:7,
  artistId:6,
  albumName:"Funeral",
  duration:0
},
  ]

  getAlbums(){
    let Songs = this.fakeSong.getSongs()
    let duration=0;
    this.Albums.map(Album=>{
      duration=0;
      Songs.map(Song=>{
        if(Album.id===Song.albumId){
          duration=duration+Song.duration
        }
      })
      Album.duration=duration
    })

    this.artists = this.fakeArtists.getArtists()
    this.modifiedAlbumData=[]

    this.Albums.map(album=>{
      this.artists.map(artist=>{
        if(album.artistId===artist.id){
          this.modifiedAlbumData.push({id:album.id,artistName:artist.name,
            albumName:album.albumName,duration:album.duration})
          }
        }
      )
    })
    return this.modifiedAlbumData
  }

  addAlbums(albumData:any){
    let ID=0;
    this.Albums.map(Album=>{
      if(Album.id>ID){
        ID=Album.id
      }
    })
    this.Albums.push({id:ID+1,artistId:Number(albumData.artistName),albumName:albumData.albumName,duration:0})
  }

  deleteAlbums(albumId:any){
    this.Albums.map(Album=>{
      if(Album.id===albumId){
        this.deletedIndex=this.Albums.indexOf(Album)
        this.deletedObject=Album
        this.Albums.splice(this.Albums.indexOf(Album),1)
      }
    })
  }

  onUndo(){
    this.Albums.splice(this.deletedIndex,0,this.deletedObject)
  }

  updateAlbums(albumId:any,updatedName:any){
    this.Albums.map(Album=>{
      if(Album.id===albumId){
        Album.albumName=updatedName
      }
    })
  }

}
