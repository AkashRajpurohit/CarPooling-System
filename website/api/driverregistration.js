document.getElementById("driverRegistration").addEventListener("submit", e => {
  e.preventDefault();
  let conditions = [];
  const drivingId = document.getElementById("dlicense").value;
  const carName = document.getElementById("dcarname").value;
  const zipcode = document.getElementById("dzipcode").value;
  const state = document.getElementById("dstate").value;
  const country = document.getElementById("dcountry").value;
  const smoking = document.getElementById("smoking").checked;
  const luggage = document.getElementById("luggage").checked;
  const ac = document.getElementById("ac").checked;
  const children = document.getElementById("children").checked;
  conditions.push({ question: "smoking", answer: smoking });
  conditions.push({ question: "luggage", answer: luggage });
  conditions.push({ question: "ac", answer: ac });
  conditions.push({ question: "children", answer: children });
  console.log(
    drivingId,
    carName,
    zipcode,
    state,
    country,
    smoking,
    luggage,
    ac,
    children
  );
  fetch(url + "/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user-id": localStorage.getItem('userId')
    },
    body: JSON.stringify({
      country: country,
      state: state,
      zipcode: zipcode,
      drivingId: drivingId,
      carName: carName,
      conditions: conditions
    })
  })
    .then(res => res.json())
    .then(info => {
      if (info.success) {
        publishRideApi()
      } else {
        alert(info.message);
      }
    })
    .catch(err => console.log(err));
});


function publishRideApi(){
  fetch(url + "/ride", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user-id": localStorage.getItem('userId')
    },
    body: localStorage.getItem('publishRide')
  })
    .then(res => res.json())
    .then(info => {
      if (info.success) {
        window.location = "index.html";
      } else {
        alert(info.message);
      }
    })
    .catch(err => console.log(err));
}
