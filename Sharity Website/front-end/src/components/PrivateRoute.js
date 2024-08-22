
import React, { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { Link, Redirect, Route } from 'react-router-dom';
import UserContext from './context/UserContext';

export default function PrivateRoute({ children, path, role = "all", ...rest }) {
const { ready, user, userSignedIn } = useContext(UserContext)


  if (!ready) {
    return null;
  }
  
	if(!userSignedIn){
		return(
		<Redirect to={{
			pathname: '/login',
			state: { sourcePath: path }
		}} />
		)
	}
	else if (role==="all"||user.role===role){
		return (
			<Route path={path} {...rest} render={()=>children} 
			/>
		)
	}

	else{
		return(
				<Alert variant={"danger"}>
				  You must be an organiser to access this feature click{' '}
				 <Link to="/home">here</Link> to go back home.
				</Alert>
		)
	}
}


