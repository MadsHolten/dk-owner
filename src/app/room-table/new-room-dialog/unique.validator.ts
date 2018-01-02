import { FormControl } from '@angular/forms';

export const UniqueValidator = (list:string[]) => {
  return (control:FormControl) => {
    var val = control.value;
    if(val && list.indexOf(val) !== -1){
      return {
        unique: true
      };
    }else{
      return null;
    }
  };
};