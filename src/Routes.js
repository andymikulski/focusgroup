/* eslint react/self-closing-comp:0 */

import React from 'react';
import { Route } from 'react-router';

import * as Pages from './pages';

export default (
	<Route>
		<Route path="/" component={ Pages.FocusGroupPage } />
	</Route>
);
