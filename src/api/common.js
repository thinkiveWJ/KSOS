/**
 * 入参 new date()；
 * @param {Object} date
 * @return yyyy-MM-dd 
 */
function getYYYYMMDD (date) {
	if(!date){
		return "";
	}
	date = new Date(date);
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	month = month > 9 ? month : '0' + month;
	let day = date.getDate();
	day = day > 9 ? day : '0' + day;
	let str = year + '-' + month + '-' + day;
	return str;
}
export {
	getYYYYMMDD
}
