import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './css/AllPages.css'

class ComplaintEmployee extends Component {
  constructor () {
    super()
    this.state = {
      complaints: [],
      loggedStatus: false,
    }
    console.log(`http://localhost:8000/api/complaints/show/1`)
  }

  /** 
   * Functie die word aangeroepen wanneer het component in het dom wordt geladen,
   * Verder wordt er gekeken naar een location parameter die wordt doorgegeven via React link, 
   * als die bestaat dan wordt de waarde gebruikt om de table kolom voor het wijzigen van statusen weergegeven aan de medewerker.
   * (De ternary operator is te vinden in de render() functie. Met gebruik van React JSX)
   * 
   * Verder wordt alle database rijen uit een database gehaald door een get-request naar onze eigen laravel api,
   * die natuurlijk een controller aanroept.
   */ 
  
  componentDidMount = () => {
    axios.get(`http://localhost:8000/api/complaints/index`).then(response => {
      this.setState({
        complaints : response.data[0]
      })
    })

    if (typeof this.props.location.state !== 'undefined' && typeof this.props.location.state.status !== 'undefined') {
      this.setState({
        loggedStatus: this.props.location.state.status,
      });
    }
  }

  /**
   * Een functie die een database column "is_completed" wijzigt van "0" naar "1" of "1" naar "0", dit wordt bepaalt door de huidige waarde van de column.
   * De wijziging vind plaats via id en de state wordt automatisch ook aangepast, zodat de render de ternary vergelijking opnieuwe uitvoert.
   * 
   * De bedoeling is dat deze functie verantwoordelijk is voor het doorgeven van de aanwijzigingen van de status van een klacht, die door een medewerker worden doorgegeven.
   */
  databaseUpdateComplaintStatus = (id, toggle) => {
    const BASE_URL_STATUS_UPDATE = `http://localhost:8000/api/complaints/status/toggle/${id}/`;
    let repArrComplaints = [];

    if (toggle === "completed") {
      axios.post(BASE_URL_STATUS_UPDATE + "1").then(res => {
        console.log(res);
      });

      Object.entries(this.state.complaints).map(entry => {
        if (entry[1].id === id) {
          entry[1].is_completed = 1;
          repArrComplaints.push(entry[1]);
        } else {
          repArrComplaints.push(entry[1]);
        }
      });

    } else if (toggle === "awaiting") {
      axios.post(BASE_URL_STATUS_UPDATE + "0").then(res => {
        console.log(res);
      });

      Object.entries(this.state.complaints).map(entry => {
        if (entry[1].id === id) {
          entry[1].is_completed = 0;
          repArrComplaints.push(entry[1]);
        } else {
          repArrComplaints.push(entry[1]);
        }
      });
    }

    this.setState({
      complaints: repArrComplaints,
    });
  }

  render () {
    const { complaints } = this.state
    console.log(complaints);

    return (

      <div className="section">
        <div className="container">

          <h1 className="title">Overzicht klachten</h1>
          <h2 className="subtitle">Hier zijn alle klachten te zien die gemeld zijn door de reizigers van deze trein</h2>
          
          <hr></hr>
          
          <div id='travelerViewBody' >
            <div id="complaints-table-wrapper" className="">
              <table className="table is-narrow is-striped is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th><p className="title is-5">Trein naam</p></th>
                    <th><p className="title is-5">E-mail</p></th>
                    <th><p className="title is-5">Klacht beschrijving</p></th>
                    <th><p className="title is-5">Status</p></th>
                    <th><p className="title is-5">Opgelost</p></th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(complaints).map(entry => {
                    return (
                        <tr key={entry[1].id}>
                          <td>{entry[1].train_name.substring(0, 15)}</td>
                          <td>{this.state.loggedStatus ? ( entry[1].email.length > 30 ? entry[1].email.substring(0, 27) + "..." : entry[1].email ) : ""}</td>
                          <td>{entry[1].complaint.length > 30 ? entry[1].complaint.substring(0, 27) + "..." : entry[1].complaint}</td>

                          <td>
                            <Link className='link-decoration'
                              to={{ pathname: "/" + entry[1].id }}
                              key={entry[1].id}
                            >Lees meer</Link>
                          </td>
                          
                          {this.state.loggedStatus ? (
                                
                            entry[1].is_completed === 0 ? (

                              <td className="field">
                                  <input id={"switchRoundedInfo" + entry[1].id} type="checkbox" name="switchRoundedInfo" className="switch is-rounded is-success" onClick={ () => {this.databaseUpdateComplaintStatus(entry[1].id, "completed")} }/>
                                  <label htmlFor={"switchRoundedInfo" + entry[1].id}></label>
                              </td>

                            ) : (

                              <td className="field">
                                  <input id={"switchRoundedInfo" + entry[1].id} type="checkbox" name="switchRoundedInfo" defaultChecked className="switch is-rounded is-success" onClick={ () => {this.databaseUpdateComplaintStatus(entry[1].id, "awaiting")} }/>
                                  <label htmlFor={"switchRoundedInfo" + entry[1].id}></label>
                              </td>
                            )

                          ) : (                       
                            console.log("Don't display switch")            
                          )}

                        </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

    )
  }
}

export default ComplaintEmployee;