import React, { Component } from "react";
import './css/AllPages.css'

class UserInput extends Component {
    constructor(props) {
        super(props);
        this.state = { fromDestination: "", toDestination: "", dateTime: "" };
        this.handleDestination = this.handleDestination.bind(this);
    }

    componentDidMount = () => {
        let date = new Date();
        let time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
        this.setState({
            dateTime: time,
        });
    };

    handleDestination = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        event.preventDefault();
        this.props.handleDestination(this.state.fromDestination, this.state.toDestination, this.state.dateTime);
    };

    render() {
        return (
            <div>
                <section className="section">
                    <div className="container">
                        <h1 className="title"> Reisgegevens </h1>
                        <h2 className="subtitle">Voer in onderstaand schema uw reisgegevens in</h2>
                        <hr></hr>
                        <article className="bodyPage">

                            <div className="field">
                                <label className="label" htmlFor="from-destination">Van station: </label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        name='fromDestination'
                                        id="from-destination"
                                        placeholder="Leiden"
                                        value={this.state.fromDestination}
                                        onChange={this.handleDestination}
                                        required />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label" htmlFor="to-destination">Naar station: </label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Amsterdam Centraal"
                                        id="to-destination"
                                        name="toDestination"
                                        value={this.state.toDestination}
                                        onChange={this.handleDestination}
                                        required
                                    />


                                </div>
                            </div>

                            <div className="field">
                                <label className="label" htmlFor="date-time">Tijd van vertrek: </label>
                                <div className="control">
                                    <input
                                        className="input"
                                        id='date-time'
                                        type="time"
                                        name="dateTime"
                                        value={this.state.dateTime}
                                        onChange={this.handleDestination}
                                        required
                                    />
                                </div>

                            </div>



                            <div className="field is-grouped is-grouped-centered buttonsPage">
                                <div className="control">
                                    <button className="button is-link" type="submit" onClick={this.onSubmit}>Verzend</button>
                                </div>
                                <div className="control">
                                    <button className="button is-text" onClick={e => { window.location = "/traveler"; }}>Annuleer</button>
                                </div>
                            </div>

                            <hr></hr>

                        </article>

                    </div>


                </section>



            </div>
        );
    }
}

export default UserInput;