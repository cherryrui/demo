module.exports = {
	cookieOptions: {
		maxAge: 3600 * 24 * 365 * 1000 * 3,
		path: '/',
	},
	/*url: "http://39.108.239.57:8888",*/
	url: "http://192.168.1.171",
	/*	url: "http://172.16.1.188",*/
	des: {
		KEY: 'sdwerdtd',
		IV: [0x12, 0x34, 0x56, 0x78, 0x90, 0xAB, 0xCD, 0xEF]
	}
}