import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FakeArtistService } from './../services/fake-artist.service';
import { FakeAlbumService } from './../services/fake-album.service';
import { FakeSongService } from '../services/fake-song.service';
import { SongService } from '../services/song.service';
import { AddSongComponent } from '../dialogs/add-song/add-song.component';
import { FilterSongComponent } from '../dialogs/filter-song/filter-song.component';
import { FilterService } from '../services/filter.service';
import { UpdateSongComponent } from '../dialogs/update-song/update-song.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements AfterViewInit {

  artists:any[]=[]
  albums:any[]=[]
  songs:any[]=[]
  modifiedSongData:{id:number,songName:string,artistName:string,albumName:string,duration:number}[]=[]
  isUndoHidden:boolean=true
  date:string=''

  songColumns: string[] = ['id','songName','artistName','albumName','duration','option'];
  songData : MatTableDataSource<Songs>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fakeArtists:FakeArtistService,
    private songService:SongService,
    private fakeAlbums:FakeAlbumService,
    private fakeSongs:FakeSongService ,
    public filterService:FilterService,
    public dialog: MatDialog
    ) {}

    getDataAndHandlePaginator(){
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

    // const SONG_DATA: Songs[]=this.modifiedSongData;
    let SONG_DATA: Songs[]=[]
    this.songService.getSongs()
      .subscribe(data=>{
        SONG_DATA=data
        this.filterService.modifiedSongData=SONG_DATA
        this.filterService.getInfoWithCheckbox()
        this.songData = new MatTableDataSource<Songs>(SONG_DATA);
        this.songData.paginator = this.paginator;
        this.songData.sort = this.sort;
      })
    // this.filterService.modifiedSongData=this.modifiedSongData
    // this.filterService.getInfoWithCheckbox()
    // this.songData = new MatTableDataSource<Songs>(SONG_DATA);
    // this.songData.paginator = this.paginator;
    // this.songData.sort = this.sort;
    }

  ngAfterViewInit(): void {
    this.getDataAndHandlePaginator()
  }

  openAddSongDialog(){
    let addSongDialog = this.dialog.open(AddSongComponent, { disableClose: true })
    addSongDialog.afterClosed().subscribe(result=>{
    this.getDataAndHandlePaginator()
    })
  }

  openFilterSongDialog(){
    let filterSongDialog = this.dialog.open(FilterSongComponent, { disableClose: true })
    filterSongDialog.afterClosed().subscribe(result=>{
      const SONG_DATA: Songs[]=this.filterService.finalFilteredArray;
    this.songData = new MatTableDataSource<Songs>(SONG_DATA);
    this.songData.paginator = this.paginator;
    this.songData.sort = this.sort;
    })
  }

  openUpdateSongDialog(element:any){
    let updateSongDialog = this.dialog.open(UpdateSongComponent,{data:{Element:element},disableClose: true})
    updateSongDialog.afterClosed().subscribe(result=>{
     this.getDataAndHandlePaginator()
    })
  }

  onDelete(data:any){
    this.fakeSongs.deleteSongs(data.id)
    this.getDataAndHandlePaginator()
    this.isUndoHidden=false
    setTimeout(()=>{
      this.isUndoHidden=true
    },5000)
  }

  undoDelete(){
    this.isUndoHidden=true
    this.fakeSongs.onUndo()
    this.getDataAndHandlePaginator()
  }

  downloadSongs(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    this.date = dd + '/' + mm + '/' + yyyy;
    SongComponent.exportSongs(this.modifiedSongData,this.date)
  }

  static exportSongs(Songs:any[],date:string){
      let fileName = 'Songs-'+date;
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(Songs);
    XLSX.utils.book_append_sheet(wb, ws, 'Songs Data');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

}

export interface Songs {
  id: number;
  songName:string;
  artistName: string;
  albumName:string;
  duration:number
}