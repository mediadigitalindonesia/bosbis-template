var Template;
(function(){
	"use strict";
	var vrStyle = {
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
		var self = this
		this.options = {
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
			clickDriver : function(){},
			imageDir : "images/"
		}

		this.events = {
			availEvent : function(e){
				var cont = self.options.beforePick(getSeatNumber(this),this)
				if(cont) return
				setPicked(this,self)
				this.removeEventListener("click",self.events.availEvent)
				self.options.clickAvailable(getSeatNumber(this),this)
			},
			pickedEvent : function(e){
				setAvailable(this,self)
				this.removeEventListener("click",self.events.pickedEvent)
				self.options.clickPicked(getSeatNumber(this),this)
			},
			bookedEvent :function(e){
				self.options.clickBooked(getSeatNumber(this),this)
			},
			soldEvent: function (e){
				self.options.clickSold(getSeatNumber(this),this)
			},
			driverEvent :function(e){
				self.options.clickDriver(getSeatNumber(this),this)
			}
		}

		this.options = extendObject(this.options,opts)
		this.usedStyle = this.getStyle()
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

	function setAvailable(el,self){
		el.style.cssText = el.style.cssText.concat(self.usedStyle.sprite,self.usedStyle.seat,self.usedStyle.available)
		el.dataset.seatId = seatId.available
		el.addEventListener("click",self.events.availEvent,false)
	}

	function setBooked(el,self){
		el.style.cssText = el.style.cssText.concat(self.usedStyle.sprite,self.usedStyle.seat,self.usedStyle.booked)
		el.dataset.seatId = seatId.booked
		el.addEventListener("click",self.events.bookedEvent,false)
	}

	function setSold(el,self){
		el.style.cssText = el.style.cssText.concat(self.usedStyle.sprite,self.usedStyle.seat,self.usedStyle.sold)
		el.dataset.seatId = seatId.sold
		el.addEventListener("click",self.events.soldEvent,false)
	}

	function setPicked(el,self){
		el.style.cssText = el.style.cssText.concat(self.usedStyle.sprite,self.usedStyle.seat,self.usedStyle.picked)
		el.dataset.seatId = seatId.picked
		el.addEventListener("click",self.events.pickedEvent,false)
	}

	function setDriver(el,self){
		el.style.cssText = el.style.cssText.concat(self.usedStyle.sprite,self.usedStyle.seat,self.usedStyle.driver)
		el.dataset.seatId = seatId.driver
		el.addEventListener("click",self.events.driverEvent,false)
	}

	function setToilet(el,index,self){
		if(!self.isAlignLeft() && !self.isVertical()) {
			if(index==0) el.style.cssText = el.style.cssText.concat(self.usedStyle.sprite,self.usedStyle.room,self.usedStyle.toilet2)
			else el.style.cssText = el.style.cssText.concat(self.usedStyle.sprite,self.usedStyle.room,self.usedStyle.toilet1)
		}else{
			if(index==0) el.style.cssText = el.style.cssText.concat(self.usedStyle.sprite,self.usedStyle.room,self.usedStyle.toilet1)
			else el.style.cssText = el.style.cssText.concat(self.usedStyle.sprite,self.usedStyle.room,self.usedStyle.toilet2)
		}
	}

	function setSmoking(el,index,self){
		if(!self.isAlignLeft() && !self.isVertical()) {
			if(index==0) el.style.cssText = el.style.cssText.concat(self.usedStyle.sprite,self.usedStyle.room,self.usedStyle.smoking2)
			else el.style.cssText = el.style.cssText.concat(self.usedStyle.sprite,self.usedStyle.room,self.usedStyle.smoking1)
		}else{
			if(index==0) el.style.cssText = el.style.cssText.concat(self.usedStyle.sprite,self.usedStyle.room,self.usedStyle.smoking1)
			else el.style.cssText = el.style.cssText.concat(self.usedStyle.sprite,self.usedStyle.room,self.usedStyle.smoking2)
		}
	}

	function getSeatObject(seatNum){
		return document.querySelector("[data-seat-number='"+seatNum+"']");
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

	function changeSeat(seats,cfunc,self) {
		for (var i in seats) {
			var el = getSeatObject(seats[i]) 
			if(!removeEvent(el,self)) return 
			cfunc(el,self)
		}
	}

	function removeEvent(el,self){
		if(el.dataset.seatId == seatId.available) el.removeEventListener("click",self.events.availEvent)
		else if(el.dataset.seatId == seatId.picked) el.removeEventListener("click",self.events.pickedEvent)
		else if(el.dataset.seatId == seatId.booked) el.removeEventListener("click",self.events.bookedEvent)
		else if(el.dataset.seatId == seatId.sold) el.removeEventListener("click",self.events.soldEvent)
		else return false
		return true
	}

	function generateTemplate(self){
		var matrix = self.options.seatMatrix.split(","),
			toiletIn = 0, 
			smokingIn = 0,
			row =0,
			col =0,
			colLength = 0,
			arrayElement = []
		
		var containerEl = document.querySelector(self.options.seatContainer)
		containerEl.innerHTML = ""
		for(var matIn in matrix){
			var colMat = matrix[matIn].split("-"),
				spaceEl = createSpaceElement()

			if(row==0)colLength++

 			switch(colMat[2]){
				case "D" :
					setDriver(spaceEl,self)
			    	break;
		    	case "S":
		    		var seatNumber = colMat[3].trim(),
						seatStyle = ""
		    		if(self.options.bookedSeats.map(String).indexOf(seatNumber) !== -1){
		    			setBooked(spaceEl,self)
		    		} else if(self.options.soldSeats.map(String).indexOf(seatNumber) !== -1){
		    			setSold(spaceEl,self)
		    		} else if(self.options.pickedSeats.map(String).indexOf(seatNumber) !== -1){
		    			setPicked(spaceEl,self)
		    		} else if(self.options.availableSeats.map(String).indexOf(seatNumber) !== -1){
		    			setAvailable(spaceEl,self)
		    		} else{
		    			if(self.options.isRestSold){
		    				setSold(spaceEl,self)
		    			} else {
		    				setAvailable(spaceEl,self)
		    			}
		    		}

		    		spaceEl.title = "#"+seatNumber
		    		spaceEl.dataset.seatNumber = seatNumber
		    		break;
		    	case "T":
		    		setToilet(spaceEl,toiletIn,self)
	    			toiletIn++
		    		break;
		    	case "R":
		    		setSmoking(spaceEl,smokingIn,self)
	    			smokingIn++
		    		break;
		    	default : 
		    		break;
			}

			if(self.isVertical()){
				
				if(col == 0){
					arrayElement[row] =[spaceEl]
				}else{
					if(self.isAlignLeft()) arrayElement[row].push(spaceEl)
					else arrayElement[row].unshift(spaceEl)
				}

			}else{

				if(self.isAlignLeft()){
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

	Template.prototype.getStyle = function(){
		var styles = {}
		if(this.isVertical()) styles = vrStyle
		else styles = hrStyle
		styles.sprite = styles.sprite.replace("images/",this.options.imageDir)
		return styles	
	}

	Template.prototype.isVertical = function() {
		return !this.options.templateAlign.match(/horizontal/gi)
	}

	Template.prototype.isAlignLeft = function() {
		return !this.options.align.match(/right/gi)
	}

	Template.prototype.setOptions = function(opts) {
		this.options = extendObject(this.options,opts)
	}

	Template.prototype.regen = function(opts) {
		if(opts)this.options = extendObject(this.options,opts)
		this.usedStyle = this.getStyle()
		generateTemplate(this)
	}

	Template.prototype.getPickedSeats = function() {
		return getPickedSeats()
	}

	Template.prototype.getPickedSum = function() {
		return getPickedLength()
	}

	Template.prototype.setSold = function(seats) {
		changeSeat(seats,setSold,this)
	}

	Template.prototype.setBooked = function(seats) {
		changeSeat(seats,setBooked,this)
	}

}())