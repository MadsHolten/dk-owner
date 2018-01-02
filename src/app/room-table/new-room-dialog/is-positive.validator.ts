import { FormControl } from '@angular/forms';

export const IsPositiveValidator = () => {
  return (control:FormControl) => {
    var val = control.value;
    if(val && !isNaN(val) && val < 0){
      return {
        positive: true
      };
    }else{
      return null;
    }
  };
};