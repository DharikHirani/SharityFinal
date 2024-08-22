const { Component } = require("react");

import React from 'react'
import './App.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default class EventCalendar extends React.Component {

    document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth'
        });
        calendar.render();
      };

    /*render() {
    return (
        <FullCalendar 
        plugins = {[ dayGridPlugin ]}
        initialView="dayGridMonth"
        /> */
    )
}

}
