import React, { useContext } from 'react';
import UserContext from '../components/context/UserContext';
import Admin from './Admin';
import Member from './Member';
import Organisation from './Organisation';


export default function Profile() {
  const { user } = useContext(UserContext);


	if (user.role === 'member') {
		return <Member />
	} else if (user.role === 'organiser') {
		return <Organisation />
	} else if (user.role === 'admin') {
		return <Admin />
	} else {
		return null;
	}
}

