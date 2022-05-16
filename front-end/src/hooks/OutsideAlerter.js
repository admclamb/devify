import React, { useRef, useEffect } from 'react';

function useOutsideAlerter(ref, setState) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setState((prevState) => !prevState);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export default function OutsideAlerter(props) {
  const { setState } = props;
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setState);
  return <div ref={wrapperRef}>{props.children}</div>;
}
