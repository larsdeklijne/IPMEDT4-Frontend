import axios from 'axios'
import React, { Component } from 'react'
import './css/AllPages.css'
import { FormErrors } from './FormErrors';

class NewComplaint extends Component {
  constructor(props) {
    super(props)

    this.state = {
      train_name: '',
      name: '',
      email: '',
      complaint: '',
      errors: [],
      formErrors: {email: ''},
      emailValid: false,
      formValid: false
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
  }

  /** 
   * Functie die word aangeroepen wanneer het component in het dom wordt geladen,
   * Verder wordt er gekeken naar een location parameter die wordt doorgegeven via React Redirect, 
   * als die bestaat dan wordt de waarde gebruikt om de trein naam in te vullen voor de gebruiker binnen de form.
   */ 

  componentDidMount = () => {
    if (typeof this.props.location.state !== 'undefined' && typeof this.props.location.state.trainCurrent !== 'undefined') {
      this.setState({
        train_name: this.props.location.state.trainCurrent.trim(),
      });
    }
  }

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  /**
   * Maakt een nieuwe klacht aan in de database door gebruik van een API verwerkt door de Laravel backend.
   */
  handleMaakNieuweKlacht = (event) => {
    const { history } = this.props
    event.preventDefault();

    //console.log(`localhost:8000/api/complaints/store/${this.state.train_name}/${this.state.name}/${this.state.email}/${this.state.complaint}`);
    axios
      .post(`http://localhost:8000/api/complaints/store/${this.state.train_name}/${this.state.name}/${this.state.email}/${this.state.complaint}`)
      .then(response => {

          this.setState({
            errors: [response.data]
        })

        console.log(this.state.errors);
        

        // redirect to traveler page
        history.push('/traveler');

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
      
    handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value},
                    () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
      let fieldValidationErrors = this.state.formErrors;
      let emailValid = this.state.emailValid;

      switch(fieldName) {

        case 'email':
          emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fieldValidationErrors.email = emailValid ? '' : ' is niet valide. De email moet op de volgende manier ingevoerd worden: voorbeeld@gmail.com';
          break;

        default:
          break;
      }
      this.setState({formErrors: fieldValidationErrors,
                      emailValid: emailValid,
                    }, this.validateForm);
    }

    validateForm() {
      this.setState({formValid: this.state.emailValid });
    }

    errorClass(error) {
      return(error.length === 0 ? '' : 'has-error');
    }

  render() {
    return (
      <div>
        <section className="section">
          <div className="container">
            <h1 className="title"> Klachtenformulier </h1>
            <h2 className="subtitle">Vul onderstaand formulier in om uw klacht door te geven aan het treinpersoneel </h2>
            <hr></hr>
            <article className="bodyPage">

              <div className="subtitle">
                <FormErrors formErrors={this.state.formErrors} />
              </div>

              <div className="field">
                <label className="label" htmlFor="train_name">Naam trein</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name='train_name'
                    value={this.state.train_name}
                    onChange={this.handleFieldChange}
                    required />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="name">Naam Reiziger</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="Naam reiziger"
                    id="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleFieldChange}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                  </span>

                </div>
              </div>

              <div className={`field ${this.errorClass(this.state.formErrors.email)}`}>
                <label className="label" htmlFor="email">Email</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    id='email'
                    type="email"
                    name="email"
                    placeholder="user@example.com"
                    value={this.state.email}
                    onChange={this.handleUserInput}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                  {/*
                            <span className="icon is-small is-right">
                              <i className="fas fa-exclamation-triangle"></i>
                            </span>
                            */}
                </div>
                {/*<p className="help is-danger">This email is invalid</p>*/}
              </div>

              <div className="field">
                <label className="label">Klacht beschrijving</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    id="complaint"
                    type="text"
                    name="complaint"
                    value={this.state.complaint}
                    onChange={this.handleFieldChange}
                    placeholder="Geluidsoverlast"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="field is-grouped is-grouped-centered buttonsPage">
                <div className="control">
                  <button className="button is-link" onClick={this.handleMaakNieuweKlacht}>Verzend</button>
                </div>
                <div className="control">
                  <button className="button is-text" onClick={e => { window.location = "/journey"; }}>Annuleer</button>
                </div>
              </div>

              <hr></hr>

            </article>
          </div>
        </section>

      </div>
    )
  }
}

export default NewComplaint
