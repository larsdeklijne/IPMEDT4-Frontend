import React, {Component} from 'react'

class EmployeeHomePage extends Component{

    /* showLogin functie zorgt ervoor dat wanneer die word aangeroepen 
       de route /login inlaad met bijbehorende componenten */
    showLogin = () => {
        const { history } = this.props
        history.push('/login')
      }
    
    /* showRegister doet hetzelfde als de showLogin functie alleen laad 
      die de route /register in ipv /login */
    showRegister = () => {
        const { history } = this.props
        history.push('/register')
      }
    

    /* in de render functie word de pagina aangemaakt waarbij een titel staat met een bijbehorende tekst van wat de pagina eigenlijk is
        verder worden er twee velden ingeladen met 'login' en 'register'.
        Als erop het veld met 'login' wordt gedrukt word de functie showLogin() aangeroepen
        Als erop het veld met 'registeer' wordt gedrukt word de functie showRegister() aangeroepen
    */

    render() {
        return (
            <div>

                <section className="section" > 
                <div className="container">

                <h1 className="title"> Medewerkerspagina </h1>
                <h2 className="subtitle">Welkom op de admin pagina. Druk op "Registreren" om een account aan te maken of op "Inloggen" als je al een account bezit</h2>
                <hr></hr>
                <main className="bodyPage">
                
                    <div className="tile is-ancestor">
                    <div className="tile is-parent" onClick={this.showLogin}>
                        <div className="tile is-child box">
                            <p className="title">Inloggen</p>
                        
                        </div>
                    </div>

                    <div className="tile is-parent">
                        <div className="tile is-child box" onClick={this.showRegister}>
                        <p className="title">Registreren</p>
                        
                        </div>
                    </div>

                    </div>

                </main>

                    </div>

                </section>
    
             </div>
        )
    }
}

export default EmployeeHomePage