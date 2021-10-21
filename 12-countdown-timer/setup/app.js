const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
const weekdays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
// console.log('tempYear', tempYear);
let tempMonth = tempDate.getMonth();
// console.log(tempMonth);
let tempDay = tempDate.getDate();
// console.log('tempDate', tempDay);

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 0, 0);
const year = futureDate.getFullYear();
console.log('year', year);
const hours = futureDate.getHours();

const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];

let weekDay = weekdays[futureDate.getDay()];

// console.log(months[month]);
// console.log(year);

giveaway.textContent = `giveaway ends on ${year} ${month} ${weekDay} ${hours}:${minutes}am`;

//future time in ms

const futureTime = futureDate.getTime();

// console.log(futureTime);

function getRemaningTime() {
	const today = new Date().getTime();
	const t = futureTime - today;
	// console.log(t);
	console.log(t);

	//values in ms
	const oneDay = 24 * 60 * 60 * 1000;
	// console.log(oneDay);
	const oneHour = 60 * 60 * 1000;
	const oneMinute = 60 * 1000;
	let days = t / oneDay;
	days = Math.floor(days);
	let hours = Math.floor((t % oneDay) / oneHour);
	let minutes = Math.floor((t % oneHour) / oneMinute);
	let seconds = Math.floor((t % oneMinute) / 1000);
	//set values array
	const values = [days, hours, minutes, seconds];
	console.log(values);
	function format(item) {
		if (item < 10) {
			return (item = `0${item}`);
		}
		return item;
	}
	items.forEach((items, index) => {
		items.innerHTML = format(values[index]);
	});
	if (t < 0) {
		clearInterval(countdown);
		deadline.innerHTML = `<h4 class = "expired">sorry, this give away has expired</h4>`;
	}
	// console.log(hours);
}
//countdown
let countdown = setInterval(() => {
	getRemaningTime();
}, 1000);
