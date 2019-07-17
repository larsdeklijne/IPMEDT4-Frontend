import React, { Component } from "react";
import axios from "axios";

class ComplaintView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            resData: {},
        };
    }

    /**
     * Functie wordt aangeroepen wanneer dit component in het dom geladen wordt.
     * Verder krijgt het een parameter mee wanneer iemand op de "lees meer" knop drukt,
     * eerst wordt er gekeken of die variabel bestaat daarna wordt de id opgeslagen in een state.
     * 
     * Daarna wordt de functie onder deze aangeroepen en wordt de rij met die id uit onze database gehaald met een Laravel API verzoek.
     */
    componentDidMount = () => {
        this.setState({
            id: this.props.match.params.id,
        });
        this.customApiCall(this.props.match.params.id);
    };

    /* Haalt de rij met die id uit onze database met een Laravel API verzoek. */
    customApiCall = id => {
        const BASE_URL = "http://localhost:8000/api/complaints/";
        axios.get(BASE_URL + id).then(res => {
            this.setState({
                resData: res.data[0],
            });
        });
    };

    render() {
        return (
            <div>
                <div className="container">

                        <div className="tile is-parent">
                            <div className="tile is-child box" onClick={this.showTravelerView}>
                            <article className="tile is-child ">

                                <h1 className="title is-4">Klachtoverzicht</h1>
                                
                                <div className="control">
                                    <textarea className="textarea" placeholder="Disabled textarea" value={"Trein naam: " + this.state.resData.train_name} disabled rows="1">  </textarea>
                                </div>

                                <hr></hr>

                                <div className="control">
                                    <textarea className="textarea" placeholder="Disabled textarea" value={"Naam: " + this.state.resData.name} disabled rows="1" >  </textarea>
                                </div>

                                <hr></hr>

                                <div className="control">
                                    <textarea className="textarea" placeholder="Disabled textarea" value={"Email: " + this.state.resData.email} disabled rows="1">  </textarea>
                                </div>

                                <hr></hr>

                                <div className="control">
                                    <textarea className="textarea" placeholder="Disabled textarea" value={"Klacht: " +  this.state.resData.complaint} disabled rows="2">  </textarea>
                                </div>

                                <hr></hr>

                                <div className="control">
                                    <textarea className="textarea" placeholder="Disabled textarea" value={this.state.resData.is_completed === 0 ? "Status: In behandeling" : "Status: Afgerond"} disabled rows="1">  </textarea>
                                </div>

                                <hr></hr>
                                
                                <div className="control">
                                    <textarea className="textarea" placeholder="Disabled textarea" value={"Ingediend: " + this.state.resData.created_at} disabled rows="1">  </textarea>
                                </div>


                                
                            </article>
                        </div>
                    </div>
                </div>
            </div>

        );

    }
}

export default ComplaintView;