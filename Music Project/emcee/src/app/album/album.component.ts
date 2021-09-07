import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FakeArtistService } from './../services/fake-artist.service';
import { FakeAlbumService } from './../services/fake-album.service';
import { AlbumService } from '../services/album.service';
import { AddAlbumComponent } from '../dialogs/add-album/add-album.component';
import { UpdateAlbumComponent } from '../dialogs/update-album/update-album.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements AfterViewInit {
    
  albumColumns: string[] = ['id','albumName','artistName','duration','option'];
  albumData : MatTableDataSource<Albums>;
  albumName:string=""
  isUndoHidden:boolean=true
  date:string=''

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fakeArtists:FakeArtistService,
    private albumService:AlbumService,
    private fakeAlbums:FakeAlbumService,
    public dialog: MatDialog) {}

    getDataAndHandlePaginator(){
      // const ALBUM_DATA: Albums[]=this.fakeAlbums.getAlbums();
      let ALBUM_DATA: Albums[]=[];
      this.albumService.getAlbums()
          .subscribe(data=>{
            ALBUM_DATA = data         
            this.albumData = new MatTableDataSource<Albums>(ALBUM_DATA);
            this.albumData.paginator = this.paginator;
            this.albumData.sort = this.sort;           
          });
      // this.albumData = new MatTableDataSource<Albums>(ALBUM_DATA);
      // this.albumData.paginator = this.paginator;
      // this.albumData.sort = this.sort;
    }

  ngAfterViewInit() {
    this.getDataAndHandlePaginator()
  }

  openAddAlbumDialog(){
    let addAlbumDialog = this.dialog.open(AddAlbumComponent, { disableClose: true })
    addAlbumDialog.afterClosed().subscribe(result=>{
    this.getDataAndHandlePaginator()
    })
  }

  openUpdateAlbumDialog(element:any){
    let updateAlbumDialog = this.dialog.open(UpdateAlbumComponent,{data:{Element:element} ,disableClose: true })
    updateAlbumDialog.afterClosed().subscribe(result=>{
      setTimeout(()=>{
        this.getDataAndHandlePaginator()
      },500)
    //  this.getDataAndHandlePaginator()
    })
  }

  onDelete(data:any){
    this.fakeAlbums.deleteAlbums(data.id)
    this.getDataAndHandlePaginator()
    this.isUndoHidden=false
    setTimeout(()=>{
      this.isUndoHidden=true
    },5000)
  }

  undoDelete(){
    this.isUndoHidden=true
    this.fakeAlbums.onUndo()
    this.getDataAndHandlePaginator()
  }

  albumFilterApply(albumName:string){
    // console.log(artistName)
    let albumData: Albums[]=this.fakeAlbums.getAlbums()
    console.log(albumData)
    albumData=albumData.filter(adata=>adata.albumName.toLowerCase()===albumName.toLowerCase()
    || adata.artistName.toLowerCase()===albumName.toLowerCase())
    this.albumData = new MatTableDataSource<Albums>(albumData);
    this.albumData.paginator = this.paginator;
    this.albumData.sort = this.sort;
  }

  albumFilterReset(){
    this.albumName=""
    this.getDataAndHandlePaginator()
  }

  downloadAlbums(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    this.date = dd + '/' + mm + '/' + yyyy;
    AlbumComponent.exportSongs(this.fakeAlbums.getAlbums(),this.date)
  }

  static exportSongs(Albums:any[],date:string){
      let fileName = 'Albums-'+date;
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(Albums);
    XLSX.utils.book_append_sheet(wb, ws, 'Album Data');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

}

export interface Albums {
  id: number;
  artistName: string;
  albumName:string;
  duration:number
}
