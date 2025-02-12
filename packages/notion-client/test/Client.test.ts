import { Client } from '../src'

describe('Notion SDK Client', () => {
	it('Constructs without throwing', () => {
		new Client({ auth: 'foo' })
	})
})
