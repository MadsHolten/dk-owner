import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

// Mapping table
var mapping = [
    {from: 'm2', to: 'm&sup2;'},
    {from: 'm3', to: 'm&sup3;'},
    {from: 'cm2', to: 'cm&sup2;'},
    {from: 'cm3', to: 'cm&sup3;'},
    {from: 'mm2', to: 'mm&sup2;'},
    {from: 'mm3', to: 'mm&sup3;'},
    {from: 'dm2', to: 'dm&sup2;'},
    {from: 'dm3', to: 'dm&sup3;'},
    {from: 'ft2', to: 'ft&sup2;'},
    {from: 'ft3', to: 'ft&sup3;'}
]

// Use like this:
// <span [innerHTML]="element.area | cdt"></span>

@Pipe({
    name: 'cdt',
    pure: false
})
export class CDTUnitsPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;

    else{
        var splitted = value.split(' ');
        var unit = splitted.pop();
        var idx = _.findIndex(mapping, x => x.from == unit);
        // If in mapping list, change the unit
        if(idx !== -1){
            var newUnit = mapping[idx].to;
            return value.replace(unit, newUnit);
        }else{
            return value;
        }
    }
  }
}