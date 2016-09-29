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

`<script type="text/javascript" src="js/bosbis-template.js"></script>`
```javascript
var template = new Template(options)
```

## Template options

You can set the following options:

Name | value | default | description
-----|-------|---------|------------
`align`| string(left,right) | left | The align of template.
`seatMatrix`| string | null | The matrix data of template
`seatContainer` | string | null | The query of element you want to place you tamplate into. [see](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
`availableSeats` | Array | [] | The list of available seat(s) that will shown in template
`pickedSeats` | Array | [] | The list of picked seat(s) that will shown in template
`bookedSeats` | Array | [] | The list of booked seat(s) that will shown in template
`soldSeats` | Array | [] | The list of sold seat(s) that will shown in template
`isRestSold` | boolean | false | The value determine the seat(s) that not defined will be available or sold. if true the seats will set as sold. Set available when false 
`imageDir` | string | "images/" | the directory of template image
`templateAlign` | string (horizontal,vertical) | "horizontal" | the align of the template
`seatClicked` | function | function(){} | The function will be called when available seat clicked but before the seat changed as picked. return true in the function will prevent seat change to picked. [see](#example-2)
`beforePick` | function | function(){} | The function will be called when available seat clicked, before the seat changed as picked
`clickAvailable` | function | function(){} | The function will be called when available seat clicked, after the seat changed as picked
`clickPicked` | function | function(){} | The function will be called when picked seat clicked
`clickBooked` | function | function(){} | The function will be called when booked seat clicked
`clickSold` | function | function(){} | The function will be called when sold seat clicked
`clickDriver` | function | function(){} | The function will be called when driver seat clicked

## Method

You can call the following method:

* `setOptions(options)` : Set new option for exsisting template object
* `regen(options)` : Regenerate template. parameter can be not included
* `getPickedSeats()` : Return `Array` of element object of picked seat 
* `getPickedSum()` : Return `Number` of picked seat 
* `setBooked(Array)` : Set `Array` contains seat number(`String`) to be booked
* `setSold(Array)` : Set `Array` contains seat number(`String`) to be sold

## Examples

#### Example-1
```javascript
<div id="container"></div>
<script type="text/javascript">
	var template = Template({
		align : "left",
		seatMatrix : "C-1-E,C-2-E,C-3-E,C-4-E,B-5-D,C-6-S-1A,C-7-S-1B,C-8-E,C-9-S-1C,B-10-S-1D,C-11-S-2A,C-12-S-2B,C-13-E,C-14-S-2C,B-15-S-2D,C-16-S-3A,C-17-S-3B,C-18-E,C-19-S-3C,B-20-S-3D,C-21-S-4A,C-22-S-4B,C-23-E,C-24-S-4C,B-25-S-4D,C-26-S-5A,C-27-S-5B,C-28-E,C-29-S-5C,B-30-S-5D,C-31-S-6A,C-32-S-6B,C-33-E,C-34-S-6C,B-35-S-6D,C-36-S-7A,C-37-S-7B,C-38-E,C-39-S-7C,B-40-S-7D,C-41-S-8A,C-42-S-8B,C-43-E,C-44-S-8C,B-45-S-8D,C-46-E,C-47-E,C-48-E,C-49-S-9A,B-50-S-9B,C-51-T,C-52-T,C-53-E,C-54-R,B-55-R",
		seatContainer : "#container",
		availableSeats : [],
		pickedSeats : [],
		bookedSeats : [],
		soldSeats : [],
		isRestSold: true,
		templateAlign : "horizontal",
		seatClicked : function(){}
	})
</script>

```

#### Example-2
```javascript
var maxSeat = 4;
template.regen({
	beforePick : function(){
		if( template.getPickedSum() == maxSeat ){
			alert("max seat is "+maxSeat)
			return true
		}
	},
	clickAvailable : function(){
		/*generate passanger form*/
	},
})
```

#### Example-3
```javascript
template.setSold(["1A","2A"])
```