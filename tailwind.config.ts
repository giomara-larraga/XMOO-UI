import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { myCustomTheme } from './custom-theme'

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {},
		fontSize: {
	
			base: ['14px', '14px'],
			
		  }
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: { custom: [
				myCustomTheme
			] }
		}),
	],
} satisfies Config;
