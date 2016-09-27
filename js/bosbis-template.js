var Template;
(function(){
	"use strict";
	var usedStyle = {},
		options = {
			align : "left",
			seatMatrix : null,
			seatContainer : null,
			availableSeats : [],
			pickedSeats : [],
			bookedSeats : [],
			soldSeats : [],
			isRestSold: false,
			templateAlign : "horizontal",
			seatClicked : function(){},
			beforePick : function(){},
			clickAvailable : function(){},
			clickPicked : function(){},
			clickBooked : function(){},
			clickSold : function(){},
			clickDriver : function(){}

		},
		vrStyle = {
			sprite : "background-image:url(images/sprite_seat_vertical.png);background-repeat: no-repeat;",
			seat :"background-size: 1000%;",
			room :"background-size: 500%;",
			driver : "background-position:1.5% 8.2%;cursor:pointer;",
			available : "background-position:13.2% 8.2%;cursor:pointer",
			sold : "background-position:25.5% 8.2%;cursor:pointer;",
			booked : "background-position:38.5% 8.2%;cursor:pointer;",
			picked : "background-position:51.2% 8.2%;cursor:pointer",
			toilet1 : "background-position:71.3% 8.2%;width: 80px;padding-Bottom: 9.62%;",
			toilet2 : "display:none;",
			smoking1 : "background-position:98.3% 8.2%;width: 80px;padding-Bottom: 9.62%;",
			smoking2 : "display:none;"
		},
		hrStyle = {
			sprite : "background-size: 100%;background-image: url(images/sprite_seat_horizontal.png);background-repeat: no-repeat;",
			seat :"",
			room :"",
			driver : "background-position: 0% 0.5%;cursor:pointer;",
			available : "background-position: 0% 50%;cursor:pointer;",
			sold : "background-position: 0% 38%;cursor:pointer;",
			booked : "background-position: 0% 25%;cursor:pointer;",
			picked : "background-position: 0% 12.5%;cursor:pointer;",
			toilet1 : "background-position: 0% 97.8%;",
			toilet2 : "background-position:0% 87%;",
			smoking1 : "background-position: 0% 73.8%;",
			smoking2 : "background-position: 0% 63%;"
		},
		seatId = {
			driver : "driver",
			available : "available",
			picked : "picked",
			booked : "booked",
			sold : "sold"
		}
	
	Template = function(opts){
		options = extendObject(options,opts)
		usedStyle = getStyle()
		generateTemplate(this)
	}

	function extendObject(opt,options){
		for (var prop in options) {
		  	if (options.hasOwnProperty(prop)) opt[prop] = options[prop]
		}
		return opt;
	}
	
	function createSpaceElement(){
		var el = document.createElement("div")
		el.style.cssText = "display: table-cell;width: 40px;padding-bottom: 19.25%;height: 0;" 
		return el
	}

	function createBrElement(){
		var el = document.createElement("div")
		el.style.cssText = "clear: both;display: table;";
		return el
	}

	function setAvailable(el){
		el.style.cssText = el.style.cssText.concat(usedStyle.sprite,usedStyle.seat,usedStyle.available)
		el.dataset.seatId = seatId.available
		el.addEventListener("click",availEvent,false)
	}

	function setBooked(el){
		el.style.cssText = el.style.cssText.concat(usedStyle.sprite,usedStyle.seat,usedStyle.booked)
		el.dataset.seatId = seatId.booked
		el.addEventListener("click",bookedEvent,false)
	}

	function setSold(el){
		el.style.cssText = el.style.cssText.concat(usedStyle.sprite,usedStyle.seat,usedStyle.sold)
		el.dataset.seatId = seatId.sold
		el.addEventListener("click",soldEvent,false)
	}

	function setPicked(el){
		el.style.cssText = el.style.cssText.concat(usedStyle.sprite,usedStyle.seat,usedStyle.picked)
		el.dataset.seatId = seatId.picked
		el.addEventListener("click",pickedEvent,false)
	}

	function setDriver(el){
		el.style.cssText = el.style.cssText.concat(usedStyle.sprite,usedStyle.seat,usedStyle.driver)
		el.dataset.seatId = seatId.driver
		el.addEventListener("click",driverEvent,false)
	}

	function setToilet(el,index){
		if(!isAlignLeft() && !isVertical()) {
			if(index==0) el.style.cssText = el.style.cssText.concat(usedStyle.sprite,usedStyle.room,usedStyle.toilet2)
			else el.style.cssText = el.style.cssText.concat(usedStyle.sprite,usedStyle.room,usedStyle.toilet1)
		}else{
			if(index==0) el.style.cssText = el.style.cssText.concat(usedStyle.sprite,usedStyle.room,usedStyle.toilet1)
			else el.style.cssText = el.style.cssText.concat(usedStyle.sprite,usedStyle.room,usedStyle.toilet2)
		}
	}

	function setSmoking(el,index){
		if(!isAlignLeft() && !isVertical()) {
			if(index==0) el.style.cssText = el.style.cssText.concat(usedStyle.sprite,usedStyle.room,usedStyle.smoking2)
			else el.style.cssText = el.style.cssText.concat(usedStyle.sprite,usedStyle.room,usedStyle.smoking1)
		}else{
			if(index==0) el.style.cssText = el.style.cssText.concat(usedStyle.sprite,usedStyle.room,usedStyle.smoking1)
			else el.style.cssText = el.style.cssText.concat(usedStyle.sprite,usedStyle.room,usedStyle.smoking2)
		}
	}

	function getStyle(){
		if(isVertical())
			return vrStyle
		return hrStyle		
	}

	function getSeatObject(seatNum){
		return document.querySelector("[data-seat-number='"+seatNum+"']");
	}

	function isVertical(){
		return !options.templateAlign.match(/horizontal/gi)
	}

	function isAlignLeft(){
		return !options.align.match(/right/gi)
	}

	function availEvent(e){
		var cont = options.beforePick(getSeatNumber(this),this)
		if(cont) return
		setPicked(this)
		this.removeEventListener("click",availEvent)
		options.clickAvailable(getSeatNumber(this),this)
	}

	function pickedEvent(){
		setAvailable(this)
		this.removeEventListener("click",pickedEvent)
		options.clickPicked(getSeatNumber(this),this)
	}

	function removeEvent(el){
		if(el.dataset.seatId == seatId.available) el.removeEventListener("click",availEvent)
		else if(el.dataset.seatId == seatId.picked) el.removeEventListener("click",pickedEvent)
		else if(el.dataset.seatId == seatId.booked) el.removeEventListener("click",bookedEvent)
		else if(el.dataset.seatId == seatId.sold) el.removeEventListener("click",soldEvent)
		else return false
		return true
	}

	function bookedEvent(){
		options.clickBooked(getSeatNumber(this),this)
	}

	function soldEvent(){
		options.clickSold(getSeatNumber(this),this)
	}

	function driverEvent(){
		options.clickDriver(getSeatNumber(this),this)
	}

	function getSeatNumber(el){
		return el.dataset.seatNumber
	}

	function getPickedLength(){
		return getPickedSeats().length
	}

	function getPickedSeats(){
		return document.querySelectorAll("[data-seat-id='"+seatId.picked+"']")
	}

	function generateTemplate(){

		var matrix = options.seatMatrix.split(","),
			toiletIn = 0, 
			smokingIn = 0,
			row =0,
			col =0,
			colLength = 0,
			arrayElement = []
		
		var containerEl = document.querySelector(options.seatContainer)
		containerEl.innerHTML = ""
		for(var matIn in matrix){
			var colMat = matrix[matIn].split("-"),
				spaceEl = createSpaceElement()

			if(row==0)colLength++

 			switch(colMat[2]){
				case "D" :
					setDriver(spaceEl)
			    	break;
		    	case "S":
		    		var seatNumber = colMat[3].trim(),
						seatStyle = ""
		    		if(options.bookedSeats.indexOf(seatNumber) !== -1){
		    			setBooked(spaceEl)
		    		} else if(options.soldSeats.indexOf(seatNumber) !== -1){
		    			setSold(spaceEl)
		    		} else if(options.pickedSeats.indexOf(seatNumber) !== -1){
		    			setPicked(spaceEl)
		    		} else if(options.availableSeats.indexOf(seatNumber) !== -1){
		    			setAvailable(spaceEl)
		    		} else{
		    			if(options.isRestSold){
		    				setSold(spaceEl)
		    			} else {
		    				setAvailable(spaceEl)
		    			}
		    		}

		    		spaceEl.title = "#"+seatNumber
		    		spaceEl.dataset.seatNumber = seatNumber
		    		break;
		    	case "T":
		    		setToilet(spaceEl,toiletIn)
	    			toiletIn++
		    		break;
		    	case "R":
		    		setSmoking(spaceEl,smokingIn)
	    			smokingIn++
		    		break;
		    	default : 
		    		break;
			}

			if(isVertical()){
				
				if(col == 0){
					arrayElement[row] =[spaceEl]
				}else{
					if(isAlignLeft()) arrayElement[row].push(spaceEl)
					else arrayElement[row].unshift(spaceEl)
				}

			}else{

				if(isAlignLeft()){
					if(row==0)arrayElement.unshift([spaceEl])
					else arrayElement[arrayElement.length-col-1].push(spaceEl)
				}else{
					if(row==0) arrayElement[col] = [spaceEl]
					else arrayElement[col].push(spaceEl)
				}
				
				colLength = row +1
			}

			col++
			if(colMat[0] == 'B'){
				row++
				col = 0
			}
		}

		for(var ir in arrayElement){
			for(var ic in arrayElement[ir]){
				arrayElement[ir][ic].style.paddingBottom = 100/colLength+"%"
				containerEl.appendChild(arrayElement[ir][ic])
				if(ic == arrayElement[ir].length-1 ) containerEl.appendChild(createBrElement())
			}
		}
	}

	function changeSeat(seats,cfunc) {
		for (var i in seats) {
			var el = getSeatObject(seats[i]) 
			if(!removeEvent(el)) return 
			cfunc(el)
		}
	}

	Template.prototype.setOptions = function(opts) {
		options = extendObject(options,opts)
	}

	Template.prototype.regen = function(opts) {
		if(opts)options = extendObject(options,opts)
		usedStyle = getStyle()
		generateTemplate()
	}

	Template.prototype.getPickedSeats = function() {
		return getPickedSeats()
	}

	Template.prototype.getPickedSum = function() {
		return getPickedLength()
	}

	Template.prototype.setBooked = function(seats) {
		
	}

	Template.prototype.setSold = function(seats) {
		changeSeat(seats,setSold)
	}

	Template.prototype.setBooked = function(seats) {
		changeSeat(seats,setBooked)
	}

	
}())