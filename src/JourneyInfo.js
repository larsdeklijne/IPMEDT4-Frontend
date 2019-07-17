import React, {Component} from "react";
import { Redirect } from 'react-router';
import axios from "axios";


import UserInput from "./UserInput";
import JourneyDisplay from "./JourneyDisplay";

class JourneyInfo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        trainInfo: "",
        trainName: [],
        trainDirection: [],
        trainCurrent: "",
        progressToggle: false,
      };
    }

    /*
    * Called after form is submitted it calls the NS API and puts the data in a variable. 
    */

    onSubmit = (fromDestination, toDestination, dateTime) => {
      this.setState({
        trainName: [],
        progressToggle: true,
      })

      let headers = {'x-api-key': process.env.REACT_APP_NS_API};
      axios.get(`https://ns-api.nl/reisinfo/api/v3/trips?fromStation=${fromDestination}&toStation=${toDestination}&dataTime=${dateTime}`, {headers}).then(res => {
          this.setState({
            trainInfo: res.data.trips[0],
          });
          this.parseInfo(res.data.trips[0]);
      });
    };

    /* 
    * Take the json data and extract every train_name and train_direction and put them in differenct arrays (name, direction).
    * Then those two arrays get set inside two state arrays.
    */
    parseInfo = data => {
      if (Object.keys(this.state.trainInfo).length) {
        let name = [];
        let direction = [];
        this.state.trainInfo.legs.forEach((item) => {
          Object.entries(item).forEach(([key, value]) => {
            if (key === "name") {
              name.push(value);
            } else if (key === "direction")
              direction.push(value);
          });
        });
        this.setState({
          trainName: name,
          trainDirection: direction,
        });
      }
      
      console.log(this.state.trainInfo);
      console.log(this.state.trainName);
      console.log(this.state.trainDirection);
      
    }
    
    /*
    * Gets called from an onclick and it sets the selected train_name and puts it inside of a state (trainCurrent).
    */
    SetTrainCurrent = trainValue => {

      if (trainValue !== "") {
        this.setState({
          trainCurrent: trainValue,
        });

        console.log(this.state.trainCurrent);
        
      }
    }

    render() {
      // Checks whether trainCurrent is set (not empty),
      // And redirects to another page along with it as a parameter.
      if (this.state.trainCurrent !== "") {
        return <Redirect push to={{pathname: "/create", state: {trainCurrent: this.state.trainCurrent}}} />;
      }

      return (
        <div>
            <div className="request-container">
              <UserInput handleDestination={this.onSubmit} />
            </div>
            {this.state.trainName.length === 0 && this.state.progressToggle ? ( 
                <div className="container">
                  <progress id="journey-progress" className="progress is-info" max="100">30%</progress>
                </div>
            ) : (
              console.log("Progress bar killed")
            )}
            {/* 
              * Shows all the applicable train info and passes the parsed trainName and trainDirection as parameters,
              * along with a function that the functional component (JourneyDisplay) can call.
              */}
            <JourneyDisplay trainName={this.state.trainName} trainDirection={this.state.trainDirection} SetTrainCurrent={this.SetTrainCurrent}/>
        </div>
      );
    }
}

export default JourneyInfo;