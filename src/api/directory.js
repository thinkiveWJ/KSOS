let directory = {
	accountStatus: {
		'待审核': 1,
		'审核通过': 2,
		'审核失败': 3,
		'黑名单': 4
	},
	accountStatus2: {
		0: '全部用户',
		1: '待审核',
		2: '审核通过',
		3: '审核失败',
		4: '黑名单'
	}
}
let getDirectory = function (text, value) {
	if (!directory[text]) {
		return text;
	}
	if (!directory[text][value]) {
		return value
	}
	return directory[text][value]
}
let directoryText = function (text) {
	return directory[text]
}
export {
	getDirectory,
	directoryText
}
