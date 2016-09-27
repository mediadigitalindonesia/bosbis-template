/*
Chrome	Firefox (Gecko)	Internet Explorer	Edge	Opera	Safari
45		34 (34)			No support			(Yes)	32		9
*/

var Template;
(function(){
	"use strict";

	Template = function(options){
		this.options = {
			align : null,
			seatMatrix : null,
			seatContainer : null,
			availableSeats : [],
			pickedSeats : [],
			bookedSeats : [],
			soldSeats : [],
			isRestSold: false,
			templateAlign : "vertical",
			seatClicked : function(){}
		}

		this.options = extendObject(this.options,options)
		generateTemplate(this)
	}

	function extendObject(opt,options){		

		/*return Object.assign({}, opt, options)*/
		for (var prop in options) {
		  	if (options.hasOwnProperty(prop)) opt[prop] = options[prop]
		}
		return opt;
	}
	
	function createSpaceElement(self){
		var el = document.createElement("div")
		el.style.cssText = "display: table-cell;width: 40px;padding-bottom: 19.25%;height: 0;" 
		

		return el
	}

	function createBrElement(self){
		var el = document.createElement("div")
		el.style.cssText = "clear: both;display: table;";
		return el
	}

	function setAvailable(self,el){
		var styles = getStyle(self)
		el.style.cssText = el.style.cssText.concat(styles.sprite,styles.seat,styles.available)
	}

	function setBooked(self,el){
		var styles = getStyle(self)
		el.style.cssText = el.style.cssText.concat(styles.sprite,styles.seat,styles.booked)
	}

	function setSold(self,el){
		var styles = getStyle(self)
		el.style.cssText = el.style.cssText.concat(styles.sprite,styles.seat,styles.sold)
	}

	function setPicked(self,el){
		var styles = getStyle(self)
		el.style.cssText = el.style.cssText.concat(styles.sprite,styles.seat,styles.picked)
	}

	function setDriver(self,el){
		var styles = getStyle(self)
		el.style.cssText = el.style.cssText.concat(styles.sprite,styles.seat,styles.driver)
	}

	function setToilet(self,el,index){
		var styles = getStyle(self)
		if(index==0)
			el.style.cssText = el.style.cssText.concat(styles.sprite,styles.room,styles.toilet1)
		else
			el.style.cssText = el.style.cssText.concat(styles.sprite,styles.room,styles.toilet2)
	}

	function setSmoking(self,el,index){
		var styles = getStyle(self)
		if(index==0)
			el.style.cssText = el.style.cssText.concat(styles.sprite,styles.room,styles.smoking1)
		else
			el.style.cssText = el.style.cssText.concat(styles.sprite,styles.room,styles.smoking2)
	}

	function getStyle(self){
		if(self.isVertical()){
			return {
				sprite : "background-image:url(images/sprite_seat_vertical.png);background-repeat: no-repeat;",
				seat :"background-size: 1000%;",
				room :"background-size: 500%;",
				driver : "background-position:1.5% 8.2%;",
				available : "background-position:13.2% 8.2%;cursor:pointer",
				sold : "background-position:25.5% 8.2%;",
				booked : "background-position:38.5% 8.2%;",
				picked : "background-position:51.2% 8.2%;cursor:pointer",
				toilet1 : "background-position:71.3% 8.2%;width: 80px;padding-Bottom: 9.62%;",
				toilet2 : "display:none;",
				smoking1 : "background-position:98.3% 8.2%;width: 80px;padding-Bottom: 9.62%;",
				smoking2 : "display:none;"
			}
		}
		
		return {
			sprite : "background-size: 100%;background-image: url(images/sprite_seat_horizontal.png);background-repeat: no-repeat;",
			seat :"",
			room :"",
			driver : "background-position: 0% 0.5%;",
			available : "background-position: 0% 50%;cursor:pointer;",
			sold : "background-position: 0% 38%",
			booked : "background-position: 0% 25%;",
			picked : "background-position: 0% 12.5%;cursor:pointer;",
			toilet1 : "background-position:0% 87%;",
			toilet2 : "background-position: 0% 97.8%;",
			smoking1 : "background-position: 0% 73.8%;",
			smoking2 : "background-position: 0% 63%;"
		}	
	}

	function getSeatObject(seatNum){
		return document.querySelector("[data-seat-number='"+seatNum+"']");
	}

	function generateTemplate(self){

		var options = self.options,
			matrix = options.seatMatrix.split(","),
			toiletIn = 0, 
			smokingIn = 0 
		
		var containerEl = document.querySelector(options.seatContainer)
		containerEl.innerHTML = ""
		for(var matIn in matrix){
			var colMat = matrix[matIn].split("-"),
				spaceEl = createSpaceElement()

 			switch(colMat[2]){
				case "D" :
					setDriver(self,spaceEl)
			    	break;
		    	case "S":
		    		var seatNumber = colMat[3].trim(),
						seatStyle = ""
		    		if(options.bookedSeats.indexOf(seatNumber) !== -1){
		    			setBooked(self,spaceEl)
		    		} else if(options.soldSeats.indexOf(seatNumber) !== -1){
		    			setSold(self,spaceEl)
		    		} else if(options.pickedSeats.indexOf(seatNumber) !== -1){
		    			setPicked(self,spaceEl)
		    		} else if(options.availableSeats.indexOf(seatNumber) !== -1){
		    			setAvailable(self,spaceEl)
		    		} else{
		    			if(options.isRestSold)
		    				setSold(self,spaceEl)
		    			else 
		    				setAvailable(self,spaceEl)
		    		}

		    		spaceEl.title = "#"+seatNumber
		    		spaceEl.dataset.seatNumber = seatNumber
		    		break;
		    	case "T":
		    		setToilet(self,spaceEl,toiletIn)
	    			toiletIn++
		    		break;
		    	case "R":
		    		setSmoking(self,spaceEl,smokingIn)
	    			smokingIn++
		    		break;
		    	default : 
		    		break;
			}

			containerEl.appendChild(spaceEl);
			if(colMat[0] == 'B'){
				var breakSpace = createBrElement()
				containerEl.appendChild(breakSpace);
			}

		}
	}

	Template.prototype.regen = function(options) {
		if(options) this.options = extendObject(this.options,options)
		generateTemplate(this)
	}

	Template.prototype.isVertical = function(){
		return !this.options.templateAlign.match(/horizontal/gi) 
	}

}())