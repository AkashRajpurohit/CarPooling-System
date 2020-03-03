document.getElementById("price").addEventListener('change', e => {
	      e.preventDefault();
        if(localStorage.getItem('distance') <= e.target.value){
            alert("Lots of other car owners are offering cheaper rides on that axis, so we suggest keeping the recommended price. Otherwise you risk getting fewer co-travellers.")
            document.getElementById("price").style.color = "red"
        }else{
            document.getElementById("price").style.color = "green"
        }
      })

document.getElementById("noOfSeat").addEventListener('change', e => {
	    e.preventDefault();
        if(e.target.value > 3){
            alert("You've reached the max. number of seats. This is limited so that car owners share their costs rather than making a profit, as doing so may affect your insurance coverage or contravene driving regulations.")
        }
      })

document.getElementById("returnJourneySelected").addEventListener('change', e => {
	    e.preventDefault();
        if(e.target.checked){
            document.getElementById("returnJourney").style.display = "flex";    
        }else{
            document.getElementById("returnJourney").style.display = "none";    
        }
      })
    
document.getElementById("publishRidesDriver").addEventListener("submit", e => {
  e.preventDefault();
  let conditions = [];
  const stopover = document.getElementById("stopover").value;
  const deptdate = document.getElementById("deptdate").value;
  const depthr = document.getElementById("depthr").value;
  const deptmin = document.getElementById("deptmin").value;
  const retdate = document.getElementById("retdate").value;
  const rethr = document.getElementById("rethr").value;
  const retmin = document.getElementById("retmin").value;
  const price = document.getElementById("price").value;
  const noOfSeat = document.getElementById("noOfSeat").value;
  const ridedetails = document.getElementById("ridedetails").value;
  const maxSeat = document.getElementById("maxSeat").checked;
  const returnJourneySelected = document.getElementById("returnJourneySelected").checked;
  const save = document.getElementById("save").checked;

  var startTime = new Date(deptdate + " " + depthr + ":" + deptmin + " " + "UTC");
  var endTime = new Date(retdate + " " + rethr + ":" + retmin + " " + "UTC");
  
  console.log(stopover, deptdate, depthr, deptmin, retdate, rethr, retmin, price, noOfSeat, ridedetails, maxSeat, save);
  
 if(returnJourneySelected){
localStorage.setItem("publishRide", JSON.stringify({ 
	"from": { "latitude":parseFloat(localStorage.getItem('origin-lat')), "longitude":parseFloat(localStorage.getItem('origin-lng')) },
	"to": { "latitude":parseFloat(localStorage.getItem('dest-lat')) , "longitude":parseFloat(localStorage.getItem('dest-lng')) }, 
	"noOfSeats":parseFloat(noOfSeat), 
	"price":parseFloat(price), 
	"datetime":startTime.toISOString(), 
	"isReturnJourney":true,
    "datetime2":endTime.toISOString()	
}))
 }else{
     localStorage.setItem("publishRide", JSON.stringify({ 
	"from": { "latitude":parseFloat(localStorage.getItem('origin-lat')), "longitude":parseFloat(localStorage.getItem('origin-lng')) },
	"to": { "latitude":parseFloat(localStorage.getItem('dest-lat')) , "longitude":parseFloat(localStorage.getItem('dest-lng')) }, 
	"noOfSeats":parseFloat(noOfSeat), 
	"price":parseFloat(price), 
	"datetime":startTime.toISOString(), 
	"isReturnJourney":false	
}))
 }
 window.location = "sign-in.html";
});