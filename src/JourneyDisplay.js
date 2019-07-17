import React from "react";

/*
* Is een functionele component die gebruikt wordt door JourneyInfo om alle treinen weertegeven door te loopen door een prop (array),
 die wordt doorgegeven aan deze functie door JourneyInfo
*/
const JourneyDisplay = props => {


  return props.trainName.map((object, i) => {

    return (
      <div key={i.toString()} >
        <div className="container">
          <div className="message is-link" style={{ marginBottom: '20px'}}  onClick={e => { props.SetTrainCurrent(object) }}>
            <div className="message-header">
              <p>{object}</p>
              <a className="button">
                <span className="icon is-small">
                  <i className="fas fa-check fa-xs"></i>
                </span>
              </a>
            </div>
            <div className="message-body">
              <p>Trein eindbestemming: {props.trainDirection[i]}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });
}

export default JourneyDisplay;