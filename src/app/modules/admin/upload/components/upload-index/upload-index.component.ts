import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { Poster } from 'src/app/models/database-models';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-upload-index',
  templateUrl: './upload-index.component.html',
  styleUrls: ['./upload-index.component.css']
})
export class UploadIndexComponent implements OnInit {

  columns = [ `title`, `uploadedDt`,`releasedDt`,`image` ];
  posterUrls!:string[];
  posters!:Poster[];
  posterDatasource!: MatTableDataSource<Poster>;
  constructor(private firebase:FirebaseService) { }

  ngOnInit(): void {
    this.populatePostersArray();
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  populatePostersArray(){
    this.firebase.getPosters().then(response =>{
      this.posters = response as Poster[];
      this.posterDatasource = new MatTableDataSource<Poster>(this.posters);
    })
  }

  showDate(timestamp:any){
    return new Date(timestamp.seconds * 1000)
  }



}
