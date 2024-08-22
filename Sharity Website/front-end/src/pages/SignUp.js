import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';
import SignUpOrgForm from '../components/forms/SignUpOrgForm';
import SignUpPersonalForm from '../components/forms/SignUpPersonalForm';
import SectionSmall from '../components/sections/SectionSmall';
import TitleSectionSmall from '../components/sections/TitleSectionSmall';


export default function SignUp() {
	const [currentForm, setCurrentForm] = useState(0)
	const forms = [{
		name: 'Personal',
		component: <SignUpPersonalForm />
	}, {
		name: 'Organisation',
		component: <SignUpOrgForm />
	}]

	return (
		<div className="pb-5">
			<TitleSectionSmall>
				<h1 className="mb-0">Sign Up</h1>
			</TitleSectionSmall>

			<SectionSmall className="border-bottom">
				<p>Account type</p>
				<Pagination className="mb-0 d-flex justify-content-stretch">
					{forms.map((form, index) => (
						<li
							className={currentForm === index ? "page-item w-100 active" : "page-item w-100"}
							onClick={() => setCurrentForm(index)}
						>
							<a className="page-link w-100 text-center rounded-" role="button">{forms[index].name}</a>
						</li>
					))}
				</Pagination>
				<div className="d-flex mt-3 text-muted">
					<p className="pr-2">
						<InfoCircle />
					</p>
					<p className="mb-0 text-muted">
						{currentForm === 0
							? "Create a personal account to gain access to locations that offer to resolve your hunger with either hot food provided at the location or with non-perishable goods, see organiser’s profile, sign up for organiser newsletters and see organiser locations/events. You can also edit, delete, get directions, and report any locations that you have had any bad experiences. You will also be able to share any interesting locations or events with your friends via WhatsApp. You will also be able to show your interest or withdraw interest and save it to your personal calendar. "
							: "Create an organisation account if you want to host any events that aim to resolve peoples hunger with either hot food provided at the location or with non-perishable goods. You will be able to add newsletters for your events, so that all of the members that have signup have access to the location details and description of the event that you would like to host. Create a personal profile with your organisation name, address, contact email address, and URL to your website so that the members can view your profile and contact you if they have any enquires."}
					</p>
				</div>
			</SectionSmall>

			<SectionSmall>
				{forms[currentForm].component}
			</SectionSmall>
		</div>
	)
}
