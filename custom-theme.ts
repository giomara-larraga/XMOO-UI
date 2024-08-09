
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "8px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "255 255 255",
		"--on-error": "255 255 255",
		"--on-surface": "0 0 0",
		// =~= Theme Colors  =~=
		// primary | #1f7095 
		"--color-primary-50": "221 234 239", // #ddeaef
		"--color-primary-100": "210 226 234", // #d2e2ea
		"--color-primary-200": "199 219 229", // #c7dbe5
		"--color-primary-300": "165 198 213", // #a5c6d5
		"--color-primary-400": "98 155 181", // #629bb5
		"--color-primary-500": "31 112 149", // #1f7095
		"--color-primary-600": "28 101 134", // #1c6586
		"--color-primary-700": "23 84 112", // #175470
		"--color-primary-800": "19 67 89", // #134359
		"--color-primary-900": "15 55 73", // #0f3749
		// secondary | #07d2c9 
		"--color-secondary-50": "218 248 247", // #daf8f7
		"--color-secondary-100": "205 246 244", // #cdf6f4
		"--color-secondary-200": "193 244 242", // #c1f4f2
		"--color-secondary-300": "156 237 233", // #9cede9
		"--color-secondary-400": "81 224 217", // #51e0d9
		"--color-secondary-500": "7 210 201", // #07d2c9
		"--color-secondary-600": "6 189 181", // #06bdb5
		"--color-secondary-700": "5 158 151", // #059e97
		"--color-secondary-800": "4 126 121", // #047e79
		"--color-secondary-900": "3 103 98", // #036762
		// tertiary | #b9acf6 
		"--color-tertiary-50": "245 243 254", // #f5f3fe
		"--color-tertiary-100": "241 238 253", // #f1eefd
		"--color-tertiary-200": "238 234 253", // #eeeafd
		"--color-tertiary-300": "227 222 251", // #e3defb
		"--color-tertiary-400": "206 197 249", // #cec5f9
		"--color-tertiary-500": "185 172 246", // #b9acf6
		"--color-tertiary-600": "167 155 221", // #a79bdd
		"--color-tertiary-700": "139 129 185", // #8b81b9
		"--color-tertiary-800": "111 103 148", // #6f6794
		"--color-tertiary-900": "91 84 121", // #5b5479
		// success | #a2a493 
		"--color-success-50": "241 241 239", // #f1f1ef
		"--color-success-100": "236 237 233", // #ecede9
		"--color-success-200": "232 232 228", // #e8e8e4
		"--color-success-300": "218 219 212", // #dadbd4
		"--color-success-400": "190 191 179", // #bebfb3
		"--color-success-500": "162 164 147", // #a2a493
		"--color-success-600": "146 148 132", // #929484
		"--color-success-700": "122 123 110", // #7a7b6e
		"--color-success-800": "97 98 88", // #616258
		"--color-success-900": "79 80 72", // #4f5048
		// warning | #970bda 
		"--color-warning-50": "239 218 249", // #efdaf9
		"--color-warning-100": "234 206 248", // #eacef8
		"--color-warning-200": "229 194 246", // #e5c2f6
		"--color-warning-300": "213 157 240", // #d59df0
		"--color-warning-400": "182 84 229", // #b654e5
		"--color-warning-500": "151 11 218", // #970bda
		"--color-warning-600": "136 10 196", // #880ac4
		"--color-warning-700": "113 8 164", // #7108a4
		"--color-warning-800": "91 7 131", // #5b0783
		"--color-warning-900": "74 5 107", // #4a056b
		// error | #3c7f59 
		"--color-error-50": "226 236 230", // #e2ece6
		"--color-error-100": "216 229 222", // #d8e5de
		"--color-error-200": "206 223 214", // #cedfd6
		"--color-error-300": "177 204 189", // #b1ccbd
		"--color-error-400": "119 165 139", // #77a58b
		"--color-error-500": "60 127 89", // #3c7f59
		"--color-error-600": "54 114 80", // #367250
		"--color-error-700": "45 95 67", // #2d5f43
		"--color-error-800": "36 76 53", // #244c35
		"--color-error-900": "29 62 44", // #1d3e2c
		// surface | #a1ccf7 
		"--color-surface-50": "241 247 254", // #f1f7fe
		"--color-surface-100": "236 245 253", // #ecf5fd
		"--color-surface-200": "232 242 253", // #e8f2fd
		"--color-surface-300": "217 235 252", // #d9ebfc
		"--color-surface-400": "189 219 249", // #bddbf9
		"--color-surface-500": "161 204 247", // #a1ccf7
		"--color-surface-600": "145 184 222", // #91b8de
		"--color-surface-700": "121 153 185", // #7999b9
		"--color-surface-800": "97 122 148", // #617a94
		"--color-surface-900": "79 100 121", // #4f6479
		
	}
}