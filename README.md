# bosbis-template

### What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
bosbistemplate/
├── images/
│   ├── sprite_seat_horizontal.png
│   └── sprite_seat_vertical.png
└── js/
    ├── bosbis-template.js
    └── bosbis-template.min.js
```

```js
var template = new Template(options)
```

## Template options

You can set the following options:

* `align` :  "left",
* `seatMatrix` : null,
* `seatContainer` : null,
* `availableSeats` : [],
* `pickedSeats` : [],
* `bookedSeats` : [],
* `soldSeats` : [],
* `isRestSold`: rest,
* `templateAlign` : "horizontal",
* `seatClicked` : function(){},
* `beforePick` : function(){},
* `clickAvailable` : function(){},
* `clickPicked` : function(){},
* `clickBooked` : function(){},
* `clickSold` : function(){},
* `clickDriver` : function(){}

## Method

You can call the following method:

* `setOptions({options})` 
* `regen(options)` 
* `getPickedSeats()` 
* `getPickedSum()` 
* `setBooked(Array)` 
* `setSold(Array)`