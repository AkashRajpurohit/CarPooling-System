// let users = [

// 	{
// 		id: 1,
// 		dist: 52,
// 		price: 350,
// 		riderRating: 4.4,
// 		score: 0
// 	},

// 	{
// 		id: 2,
// 		dist: 60,
// 		price: 300,
// 		riderRating: 4.5,
// 		score: 0
// 	},

// 	{
// 		id: 3,
// 		dist: 30,
// 		price: 360,
// 		riderRating: 4.0,
// 		score: 0
// 	},

// 	{
// 		id: 23,
// 		dist: 44,
// 		price: 390,
// 		riderRating: 4.7,
// 		score: 0
// 	}

// ];


function getRecommendation(users){

	const baseCount = users.length;
	const baseDist = 12;
	const baseRating = 9;
	const basePrice = 9;

	let distArr = []
	let priceArr = []
	let riderRatingArr = []

	for(let i = 0; i<=baseCount-1; i++){
		distArr.push([users[i].dist, users[i].id]);
		priceArr.push([users[i].price, users[i].id]);
		riderRatingArr.push([users[i].riderRating, users[i].id]);
	}


	distArr.sort((a, b) => b[0] - a[0]);
	priceArr.sort((a, b) => b[0] - a[0]);
	riderRatingArr.sort();

	function getIndex(array, value) {
		for(let i = 0; i < array.length; i += 1) {
			if(array[i].id === value) {
				return i;
			}
		}
		return -1;
	}

	for(let i = 0; i<=baseCount-1; i++){

		let index1 = getIndex(users, distArr[i][1]);
		let newScore1 = (i+1)*baseDist;
		users[index1].score += newScore1;

		let index2 = getIndex(users, priceArr[i][1]);
		let newScore2 = (i+1)*basePrice;
		users[index2].score += newScore2;

		let index3 = getIndex(users, riderRatingArr[i][1]);
		let newScore3 = riderRatingArr[i][0]*baseRating;
		users[index3].score += newScore3;

	}

	users.sort((a,b) => b.score - a.score);
	return users;
}

module.exports = getRecommendation;