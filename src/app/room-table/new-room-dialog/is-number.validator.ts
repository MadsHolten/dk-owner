import { FormControl } from '@angular/forms';

export const IsNumberValidator = () => {
  return (control:FormControl) => {
    var val = control.value;
    if(val && isNaN(val)){
      return {
        nan: true
      };
    }else{
      return null;
    }
  };
};