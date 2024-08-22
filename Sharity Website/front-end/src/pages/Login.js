import React from 'react';
import LoginForm from '../components/forms/LoginForm';
import SectionSmall from '../components/sections/SectionSmall';
import TitleSectionSmall from '../components/sections/TitleSectionSmall';

export default function Login({ location: { state } }) {
	const sourcePath = state ? state.sourcePath : null;

	return (
		<>
			<TitleSectionSmall>
				<h1 className="mb-0">Login</h1>
			</TitleSectionSmall>

			<SectionSmall>
				<LoginForm sourcePath={sourcePath} />
			</SectionSmall>
		</>
	)
}