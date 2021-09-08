import {Component, OnInit} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'connect-four'
  items = new Array(5).fill(" ").map(() => new Array(5).fill(" "));
  size = 25;
  xmodel = "5"
  ymodel = "5"


  constructor( private clipboard: Clipboard) {
  }

  ngOnInit(): void {
  }

  lol(index1: any, index2: any) {
    let string = " "
    if (this.items[index1][index2] == " ") {
      string = "X"
    } else if (this.items[index1][index2] == "X") {
      string = "O"
    } else {
      string = " "
    }
    this.items[index1][index2] = string;



    this.gravity();
  }

  gravity() {
    for (let i1 = 0; i1 < this.items.length; i1++){
      let item1 = this.items[i1];
      let string = "";
      for (let i2 = 0; i2 < item1.length; i2++){
        let item2 = item1[i2];
        if (item2 != " ") {
          console.log("FUCK1")
          if (i2 <= item1.length - 1 && item1[i2 + 1] == " ") {
            item1[i2 + 1] =  item1[i2];
            item1[i2] = " ";
            console.log("FUCK2")
          }
        }
       string+=item2;
      }
      console.log(string)
    }
    console.log(this.items)
  }

  changeXY() {
    this.items = new Array(parseInt(this.xmodel, 10)).fill(" ").map(() => new Array(parseInt(this.ymodel, 10)).fill(" "));

    console.log(this.items)
  }

  filterResults(event: any, isX: boolean) {
    let search: string = event.target.value;
    if (isX) {
      this.xmodel = search;
    } else {
      this.ymodel = search;
    }
  }

  getColor(i: any) {
    if (i == "X") {
      return 'red';
    } else if (i == "O") {
      return 'blue';
    } else{
      return 'green';
    }
  }

  export() {
  let output = "String[][] arr = {\n";
    for (let i1 = 0; i1 < this.items.length; i1++){
      let item = this.items[i1];
      output += "{";
      for (let i = 0; i < item.length; i++){
        output += '"' + this.items[i1][i] + '",';
      }
      output += "},\n";
    }
    output += "};";
    this.clipboard.copy(output);
    console.log("copied")
  }
}

