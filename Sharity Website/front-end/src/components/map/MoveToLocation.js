import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function MoveToLocation({ state, setState }) {
  const map = useMap();

  if (state.shouldMove) {
    const location = [state.moveTo.latitude, state.moveTo.longitude]
    map.setView(location, 15, {
      animate: true,
    })

    setState({
      shouldMove: false,
      moveTo: null
    })
  }

  return null;
}