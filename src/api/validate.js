/**
 * 验证邮箱格式
 * @param email
 * @returns {boolean}
 */
function emailValidate (email) {
  var emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  return emailReg.test(email)
}
/**
 * 验证密码8-16位字母数字组合
 * @param password
 * @returns {boolean}
 */
function passwordValidate (password) {
  var passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
  return passwordReg.test(password)
}
/**
 * 验证11位数字的手机号码
 * @param {Object} phone
 */
function phoneValidate (phone) {
	return /^\d{11}$/.test(phone);
}
/**
 * 判断是否为空
 * @param {Object} val
 */
function isEmpty (val) {
	if (val === '' || val === null || val === undefined) {
		return true;
	}
	return false
}
/**
 * 判断两个字符串是否完全相等
 * @param {Object} str
 * @param {Object} str2
 */
function isStrEqual (str, str2) {
	return str === str2
}
export {
  emailValidate,
  passwordValidate,
  phoneValidate,
  isEmpty,
  isStrEqual
}