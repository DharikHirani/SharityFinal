import React, { useContext, useEffect, useState } from 'react';

export default function EventToCalendar({ user }) {

    const [events, setEvents] = useState([]); 

    useEffect(() => {
		fetch(`http://localhost:8080/user/${user.id}/events`)
			.then((res) => res.json())
			.then((data) => {
				setEvents(data);
			})
			.catch(console.log);
	}, [user])

    const popoverRef = useRef()
    useEffect(() => {
      var popover = new Popover(popoverRef.current, {
          content: {title, date, startTime, endTime},
          title: {location.name},
          trigger: 'hover'
      })
    })
}

