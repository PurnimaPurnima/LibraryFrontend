import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {

  constructor() { }

  @Input() rating:number=4;
  cropWidth:number=75;
  @Output() ratingClicked:EventEmitter<number> = new EventEmitter<number>();


  ngOnChanges():void{
    this.cropWidth=this.rating*75/5;
  }

  onClick(){
    this.ratingClicked.emit(this.rating);
  }

}
