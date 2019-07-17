import React, { Component } from 'react'
import axios from 'axios';
import { FormErrors } from './FormErrors';

class Login extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            errors: {},
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        }

        this.handleLogin = this.handleLogin.bind(this)

    }

    /* functie die de login afhandeld en redirect met een parameter naar een andere pagina om de status van logIn af te dwingen op de andere pagina*/
    handleLogin = (event) => {

        const { history } = this.props

        event.preventDefault()

        axios
          .get(`http://localhost:8000/api/user/login/${this.state.email}/${this.state.password}`)
          .then(response => {

            console.log(response.data);
            if (response.data) {
                let logged = true;
                this.props.history.push({
                    pathname: '/employee',
                    state: { status: logged }
                })
            } else {
                this.props.history.push("/login");
            }
          })
         
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
                    <h1 className="title"> Login </h1>
                    <h2 className="subtitle">Vul onderstaande informatie in om in te loggen</h2>
                    <hr></hr>
                    <article className="bodyPage">

                    <div className="subtitle">
                        <   FormErrors formErrors={this.state.formErrors} />
                    </div>

                    <div className={`field ${this.errorClass(this.state.formErrors.email)}`}>
                        <label className="label" htmlFor="email">Email address</label>
                        <div className="control">
                        <input
                            className="input"
                            type="email"
                            name='email'
                            value={this.state.email}
                            onChange={this.handleUserInput}
                            required />
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

                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                        <button className="button is-link" onClick={this.handleLogin}>Login</button>
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

export default Login