# OwnerApp

[Demo](https://MadsHolten.github.io/dk-owner/)

This is just a demo of how a very simple UI for establishing a BOT-based owner's requirement dataset could look like.

The overall idea is the following:

1. Owner creates a set of bot:Spaces and attaches general requirements to them.

   Instances:
   bot:Space
      Properties: required area, indoor climate class, occupants, equipment load

2. Architect starts volume studies and linkes the volumes to one or more of the bot:Spaces in the owner's requirements model. At this point some building elements exist, and the engineers can start doing initial assessments of the technical design aspects.

   Instances:
   bot:Space (linked to owner's instances with owl:sameAs??)
      Properties: actual area and volume, geometrical properties
   bot:Element
      Properties: look and feel (texture etc.), geometrical properties

3. HVAC engineer attaches technical properties to spaces and elements and generates interfaces between spaces and elements to quantify heat transmission areas. When the necessary inputs are given, the static heat loss for all rooms can be inferred for further use.

   Instances:
   bot:Space (linked to owner's and architect's instances with owl:sameAs??)
      Properties: heating system design temperature, heating demand
   bot:Element (linked to owner's and architect's instances with owl:sameAs??)
      Properties: required U-value (will change to actual as design progresses)
   bot:Interface
      Properties: heat transmission area, heat transmission length, surface resistance

4. HVAC engineer designs radiators and heating system.

   Instances:
   bot:Element
      Properties: required power, required flow, part of which flow system?
   fso:FlowSystem
      Properties: total flow, total power