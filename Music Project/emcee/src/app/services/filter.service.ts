import { Injectable } from '@angular/core';
import { FakeAlbumService } from './fake-album.service';
import { FakeArtistService } from './fake-artist.service';
import { FakeSongService } from './fake-song.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  songsWithCheckbox:{songName:string,isChecked:boolean}[]=[]
  artistsWithCheckbox:{artistName:string,isChecked:boolean}[]=[]
  albumsWithCheckbox:{albumName:string,isChecked:boolean}[]=[]

  songNames:any[]=[]
  artistNames:any[]=[]
  albumNames:any[]=[]

  artists:any[]=[]
  albums:any[]=[]
  songs:any[]=[]
  modifiedSongData:{id:number,songName:string,artistName:string,albumName:string,duration:number}[]=[]

  finalFilteredArray:{id:number,songName:string,artistName:string,albumName:string,duration:number}[]=[]


  constructor(
    private fakeArtists:FakeArtistService,
    private fakeAlbums:FakeAlbumService,
    private fakeSongs:FakeSongService,
  ) {

    this.artists = this.fakeArtists.getArtists()
    this.albums = this.fakeAlbums.getAlbums()
    this.songs = this.fakeSongs.getSongs() 
    this.modifiedSongData=[]
    this.songs.map(song=>{
      this.albums.map(album=>{
        if(song.albumId===album.id){
            this.artists.map(artist=>{
              if(song.artistId===artist.id){
                this.modifiedSongData.push({id:song.id,songName:song.songName,artistName:artist.name,
                  albumName:album.albumName,duration:song.duration})
              }
            })
          }
        }
      )
    })

    // this.modifiedSongData.map(record=>{
    //   if(!this.songNames.includes(record.songName))
    //     this.songNames.push(record.songName)
    //   if(!this.artistNames.includes(record.artistName))
    //     this.artistNames.push(record.artistName)
    //   if(!this.albumNames.includes(record.albumName))
    //     this.albumNames.push(record.albumName)
    // })
    // this.songNames.map(songName=>{
    //   this.songsWithCheckbox.push({songName:songName,isChecked:false})
    // })
    // this.artistNames.map(artistName=>{
    //   this.artistsWithCheckbox.push({artistName:artistName,isChecked:false})
    // })
    // this.albumNames.map(albumName=>{
    //   this.albumsWithCheckbox.push({albumName:albumName,isChecked:false})
    // })
    this.getInfoWithCheckbox()

   }

   getInfoWithCheckbox(){
     this.songNames=[]
     this.artistNames=[]
     this.albumNames=[]
     this.songsWithCheckbox=[]
     this.artistsWithCheckbox=[]
     this.albumsWithCheckbox=[]

    // console.log("IN Get",this.modifiedSongData)

    this.modifiedSongData.map(record=>{
      if(!this.songNames.includes(record.songName))
        this.songNames.push(record.songName)
      if(!this.artistNames.includes(record.artistName))
        this.artistNames.push(record.artistName)
      if(!this.albumNames.includes(record.albumName))
        this.albumNames.push(record.albumName)
    })

    // console.log("this.songNames - ",this.songNames)

    this.songNames.map(songName=>{
      this.songsWithCheckbox.push({songName:songName,isChecked:false})
    })
    // console.log("this.songsWithCheckbox -",this.songsWithCheckbox)
    this.artistNames.map(artistName=>{
      this.artistsWithCheckbox.push({artistName:artistName,isChecked:false})
    })
    this.albumNames.map(albumName=>{
      this.albumsWithCheckbox.push({albumName:albumName,isChecked:false})
    })
   }
}
