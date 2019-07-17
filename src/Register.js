import React, { Component } from 'react'
import axios from 'axios';
import { FormErrors } from './FormErrors';

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            errors: [],
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        }

        
        this.handleMakeNewUser = this.handleMakeNewUser.bind(this)
        this.handleFieldChange = this.handleFieldChange.bind(this)
        

    }

    /* functie die word aangeroepen wanneer de waarde van een veld uit het form veranderd word */
    handleFieldChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }
    
      /* functie die een nieuwe gebruiker aanmaakt door de ingevoerde data uit het form te sturen naar de laravel backend */
      handleMakeNewUser = (event) => {
        event.preventDefault()
    
        const { history } = this.props
         console.log(`http://localhost:8000/api/user/register/${this.state.name}/${this.state.email}/${this.state.password}`);
        axios
          .post(`http://localhost:8000/api/user/register/${this.state.name}/${this.state.email}/${this.state.password}`)
            .then(response => { 

                this.setState({
                    errors: [response.data]
                })

                console.log(this.state.errors);
                

                // redirect to login page
                history.push('/login');

            })
            .catch(error => {
                console.log(error);
                console.log(error.response.data);

                this.setState({
                    errors: [error.response.data]
                })

                console.log(this.state.errors)
            
               
            });
          
         
    }

     /* Functies die checken of de gebruiker de juiste waarde invoert in de velden van het formulier */
    /* als de gebruiker een verkeerde waarde invoert, verschijnt er een tekst met welke velden er verkeerd ingevuld zijn */

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });
      }
    
      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
    
        switch(fieldName) {

          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is niet valide. De email moet op de volgende manier ingevoerd worden: voorbeeld@gmail.com';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '': ' is te kort. Het wachtwoord moet minimaal 6 tekens lang zijn';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid
                      }, this.validateForm);
      }
    
      validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
      }
    
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }



      
    render(){
        return (
                <div>
                    <section className="section">
                    <div className="container">
                        <h1 className="title"> Registreer </h1>
                        <h2 className="subtitle">Vul onderstaande informatie in om een account te registreren</h2>
                        <hr></hr>
                        <article className="bodyPage">

                        <div className="subtitle">
                        <   FormErrors formErrors={this.state.formErrors} />
                        </div>

                        <div className="field">
                            <label className="label" htmlFor="name">Naam</label>
                            <div className="control">
                            <input
                                className="input"
                                type="text"
                                name='name'
                                value={this.state.name}
                                onChange={this.handleFieldChange}
                                required />
                               
                            </div>
                        </div>

                        <div className={`field ${this.errorClass(this.state.formErrors.email)}`}>
                            <label className="label" htmlFor="email">Email address</label>
                            <div className="control">
                            <input
                                className="input"
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleUserInput}
                                required
                            />
                            
                            </div>
                        </div>

                        <div className={`field ${this.errorClass(this.state.formErrors.password)}`}>
                            <label className="label" htmlFor="password">Wachtwoord</label>
                            <div className="control">
                            <input
                                className="input"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleUserInput}
                                required
                            />
                            
                            </div>
                        </div>

                        <div className="field is-grouped is-grouped-centered buttonsPage">
                            <div className="control">
                            <button className="button is-link" onClick={this.handleMakeNewUser} >Registreer</button>
                            </div>
                            <div className="control">
                            <button className="button is-text" onClick={e => { window.location = "/employeehomepage"; }}>Annuleer</button>
                            </div>
                        </div>

                        </article>
                    </div>
                    </section>

            </div>
        )
    }
}

export default Register