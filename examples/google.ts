/*
 * @adonisjs/ally
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Route from '@ioc:Adonis/Core/Route'

Route.get('/google', async ({ ally }) => {
	return ally.use('google').redirect((config) => {
		config
			.prompt('consent')
			.scopes(['calendar.events', 'userinfo.email', 'userinfo.profile'])
			.hostedDomain('adonisjs.com')
	})
})

Route.get('/google/callback', async ({ ally }) => {
	const driver = ally.use('google')
	if (driver.accessDenied()) {
		return 'Access was denied'
	}

	if (driver.hasError()) {
		return 'There was an error'
	}

	return driver.getUser()
})
