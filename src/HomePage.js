import React, { Component } from 'react'
import './css/AllPages.css'
import reizigersAfbeelding from './img/reizigers.jpg';
import medewerkersAfbeelding from './img/medewerkers.jpg';

class HomePage extends Component {

  /* wanneer de functie word aangeroepen word de route /journey met bijbehorende componenten ingeladen */
  showTravelerView = () => {
    const { history } = this.props
    history.push('/journey')
  }

  /* wanneer de functie word aangeroepen word de route /employeehomepage met bijbehorende componenten ingeladen */
  showEmployeeHomePage = () => {
    const { history } = this.props
    history.push('/employeehomepage')
  }


  /* welkomstpagina van de applicatie met twee velden: Reiziger en medewerker
     als de gebruiker klikt op reiziger word showTravelerView() aangeroepen en afgehandeld
     als de gebruiker klikt op medewerker word showEmployeeHomePage aangeroepen en afgehandeld
  */

  render() {
    return (
      <section className="section" >
        <div className="container ">

          <h1 className="title is-3"> NS - Klachtenservice </h1>
          <h2 className="subtitle">Kies als reiziger voor "Reiziger", kies als medewerker voor "Medewerker" </h2>
          <hr></hr>

          <main className="bodyPage">
            <div className="tile is-ancestor">
              <div className="tile is-parent">
                <div className="tile is-child box" onClick={this.showTravelerView}>
                  <article className="tile is-child ">
                    <h1 className="title is-4">Reiziger</h1>
                    <p className="subtitle">Druk op de afbeelding om verder te gaan</p>
                    <figure>
                      <img src={reizigersAfbeelding} alt="Reizigers kant" />
                    </figure>
                  </article>
                </div>
              </div>
            

              <div className="tile is-parent">
                <div className="tile is-child box" onClick={this.showEmployeeHomePage}>
                  <article className="tile is-child ">
                    <h1 className="title is-4">Medewerker</h1>
                    <p className="subtitle">Druk op de afbeelding om verder te gaan</p>
                    <figure>
                      <img src={medewerkersAfbeelding} alt="Medewerkers kant" />
                    </figure>
                  </article>
                </div>
              </div>

            </div>

          </main>

        

        </div>
      </section>
    )
  }
}

export default HomePage
