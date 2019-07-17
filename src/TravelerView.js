import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './css/AllPages.css'
import './css/TravelerView.css'

class ComplaintTraveler extends Component {
  constructor() {
    super()
    this.state = {
      complaints: [],
      trainCurrent: '',
    }
    console.log(`http://localhost:8000/api/complaints/show/1`)
  }


  /* Functie word aangeroepen wanneer dit component in het dom geladen wordt */
  /* De functie roept de zelfgemaakte laravel api aan die een lijst teruggeeft van alle complaints uit de database */
  /* De complaints worden vervolgens in de array complaints opgeslagen zodat die later in een lijst getoond kunnen worden */

  componentDidMount = () => {
    axios.get(`http://localhost:8000/api/complaints/index`).then(response => {

      this.setState({
        complaints: response.data[0]
       
      })
      console.log(this.state.complaints);
    })

    if (typeof this.props.location.state !== 'undefined' && typeof this.props.location.state.key !== 'undefined') {
      this.setState({
        trainCurrent: this.props.location.state.key.trim(),

      });
    }

      
      
  }

  render() {
    const { complaints } = this.state
    const { trainCurrent } = this.state

    console.log(complaints);
    console.log(trainCurrent);
    return (
      <div className="section">
        <div className="container">

          <h1 className="title">Overzicht klachten</h1>
          <h2 className="subtitle">Hier zijn alle klachten te zien die gemeld zijn in verschillende treinen</h2>
          <h2 className="subtitle">Uw bevind zich in trein: {this.state.trainCurrent} </h2>
          
          <hr></hr>

          <div className="field is-grouped is-grouped-centered buttonsPage">
                <div className="control">
                <button  className="button is-link" id="travelerViewButton"  onClick={e => { window.location = "/journey"; }}>Maak een nieuwe klacht aan</button>
                </div>
          </div>

          <div id='travelerViewBody' >
            <div id="complaints-table-wrapper">
              <table className="table is-narrow is-striped is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th> <p className="title is-5">Trein naam</p></th>
                    <th> <p className="title is-5">Klacht beschrijving</p></th>
                    <th> <p className="title is-5">Status</p></th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(complaints).map(entry => {
                    return (
                        <tr key={entry[1].id}>
                          <td>{entry[1].train_name.substring(0, 15)}</td>
                          <td>{entry[1].complaint.length > 30 ? entry[1].complaint.substring(0, 27) + "..." : entry[1].complaint}</td>
                          <td>{entry[1].is_completed === 0 ? "Status: In behandeling" : "Status: Afgerond"}</td>
                          <td>
                            <Link className='link-decoration'
                              to={{ pathname: "/" + entry[1].id }}
                              key={entry[1].id}
                            >Lees meer</Link>
                          </td>
                        </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default ComplaintTraveler
