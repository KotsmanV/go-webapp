import { Component, OnInit } from '@angular/core';
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

  columns = [ `title`, `date` ]

  posterDatasource!: NbTreeGridDataSource<Poster>;
  constructor(private firebase:FirebaseService,private fileService:FileUploadService, private dataSourceBuilder: NbTreeGridDataSourceBuilder<Poster>) { }

  ngOnInit(): void {
    this.fileService.getAllFiles(`posters`).then(resp=>{
      console.log(resp);
    })

    this.posterDatasource = this.dataSourceBuilder.create(this.firebase.getPosters());

  }




  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }



}
