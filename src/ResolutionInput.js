import React, {useState, useEffect} from 'react';

function ResolutionInput(props) {

  const [selection, setSelection] = useState(null);

  useEffect(() => {
    setSelection(props.selection)
  }, [props]);

  return (
    <div>
      <div>
        <input
          type="radio"
          id="week"
          checked={selection === "week"}
          onChange={() => null}
          onClick={() => props.callBack("week")}
        />
        <label htmlFor="week">Weekly</label>
      </div>
      <div>
        <input
          type="radio"
          id="day"
          checked={selection === "day"}
          onChange={() => null}
          onClick={() => props.callBack("day")}
        />
        <label htmlFor="day">Daily</label>
      </div>
      <div>
        <input
          type="radio"
          id="hour"
          checked={selection === "hour"}
          onChange={() => null}
          onClick={() => props.callBack("hour")}
        />
        <label htmlFor="hour">Hourly</label>
      </div>
    </div>
  )
}


export default ResolutionInput;