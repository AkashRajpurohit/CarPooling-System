
function bookRide(rideId) {
	let info = {
		rideId,
		count: parseInt(localStorage.getItem('seatCount'))
	};

	fetch(`${url}/ride/book`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			"user-id": localStorage.getItem('userId'),
			'Access-Control-Allow-Headers': '*'
		},
		body: JSON.stringify(info)
	})
	.then(res => res.json())
	.then( data => {
		alert("Booking Successful");
		window.location = 'index.html';
	})
	.catch(err => alert(err.message));

}


document.getElementById('customer-form').addEventListener('submit', e => {
	e.preventDefault();

	const origin = [localStorage.getItem('origin-lat'),localStorage.getItem('origin-lng')];
	const destination = [localStorage.getItem('dest-lat'),localStorage.getItem('dest-lng')];
	const dateFormat = document.getElementById('datefield').value;

	console.log(localStorage.getItem('origin'));
	
	const hrs = document.getElementById('hrs');
	let hour = hrs.options[hrs.selectedIndex].value;
	
	const mins = document.getElementById('mins');
	let min = mins.options[mins.selectedIndex].value;

	const seats = document.getElementById('seats');
	let seatCount = seats.options[seats.selectedIndex].value;
	localStorage.setItem('seatCount', seatCount);


	let datetimeObj = new Date(dateFormat + " " + hour + ":" + min + " UT");
	console.log(origin, destination, datetimeObj.toISOString());

	info = {
		from: {
			latitude: parseFloat(origin[0]),
			longitude: parseFloat(origin[1])
		},
		to: {
			latitude: parseFloat(destination[0]),
			longitude: parseFloat(destination[1])
		},
		datetime: datetimeObj.toISOString()
	};

	let output = '';

	fetch(`${url}/ride/all`,{
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"user-id": localStorage.getItem('userId'),
			'Access-Control-Allow-Headers': '*'
		  },	  
		body: JSON.stringify(info)
	})
	.then( res => res.json())
	.then( info => {

		let vals = info.data;
		console.log(vals);


		output += `
					<div class="container" style="margin-top:40px;">
						<div class="card w-100">
						<div class="card-body">
						<h5 class="card-title">${vals ? vals.length : 0} Available ride(s)</h5>
							<h4><span class="fas fa-location-arrow map-input-icon">${ localStorage.getItem('origin')}</span></h4>
							<br>
							<h4><span class="map-input-icon"><img src="../icons/circle.svg"  alt="Current Location Icon">${ localStorage.getItem('dest')}</span></h4>

						</div>
						</div>
						<br>
					</div>
					`;

		vals.forEach( element => {

			output += `
						<div class="card w-100">
							<div class="card-body">
								<h5 class="card-title">${element.offeredBy.name}</h5>
								<h6 class="card-subtitle mb-2 text-muted">${element.offeredBy.name}</h6>
								<p class="card-text">Date : ${element.datetime}</p>
								<p class="card-text">Time : ${element.time}</p>
								<p class="card-text">Rating : ${element.riderRating}</p>
								<p class="card-text">No of Seats : ${element.noOfSeats}</p>
								<p class="card-text">Price : ${element.price}</p>
								<button type="button" class="btn btn-primary" onclick="bookRide('${element._id}')">
								Book Ride
							  	</button>
							</div>
						</div>
						<br>
					`;
		});

		document.getElementById('rideCards').innerHTML = output;
	})
	.catch( err => console.log(err));
});



