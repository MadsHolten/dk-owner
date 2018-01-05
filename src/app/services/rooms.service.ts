import { Injectable } from '@angular/core';

import { TriplestoreService } from './triplestore.service';

@Injectable()
export class RoomsService  extends TriplestoreService {

    public createRoom(data){

        var g = this.endpointSettings.namedGraph;
        var uri = data.uri;
        var name = data.name;
        var id = data.id;
        var type = data.type;
        var area = data.area;

        var q = `
        PREFIX bot: <https://w3id.org/bot#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>
        PREFIX prop:<https://w3id.org/prop#>
        INSERT DATA
        {
          GRAPH <${g}> { 
              <${uri}> a bot:Space ;
                rdfs:label "${name}"^^xsd:string ;
                prop:type "${type}"^^xsd:string ;
                prop:id "${id}"^^xsd:string .`
        if(area) q+= `<${uri}> prop:area "${area}"^^xsd:string .`
        q+= `
          }
        }
        `;

        return this.updateQuery(q);            
    }

    public getRoomsSingle(data){
        var q = `
        SELECT * WHERE
        {
          GRAPH <http://example/bookStore> { ?s ?p ?o }
        }
        `;

        return this.getQuery(q);
    }

}