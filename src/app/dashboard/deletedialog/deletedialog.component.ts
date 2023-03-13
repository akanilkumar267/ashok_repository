import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})
export class DeletedialogComponent {
  constructor(public dialogref:MatDialogRef<DeletedialogComponent>,private subData: LoginService, private alertservice: CommonService,@Inject(MAT_DIALOG_DATA) public data: any){

  }
  closeDialog(){
    this.dialogref.close();

  }
  deleteData(){
    this.subData.deletesubcategoryservice(this.data.sub_category_id_data).subscribe((response: any) => {
      console.log(response)
        if (response.status == 1) {
          this.alertservice.SuccessMessage("Data deleted Successfully");
          this.dialogref.close();
         }
       });

  }
  


}
