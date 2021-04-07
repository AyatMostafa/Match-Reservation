import React, { Component } from 'react';
import axios from 'axios';
import { Label, FormGroup, Button, Form  } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
import TimePicker from 'react-time-picker';
import DatePicker from "react-datepicker";
import Select from "react-select";
import { withRouter,Redirect } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

import 'react-datetime-picker/dist/DateTimePicker.css';

const serverURL = "http://localhost:5000";

class CreateMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HomeTeam: '',
            AwayTeam: '',
            Venue: '',
            DateAndTime: '',
            // MatchTime: 0,
            MainReferee: '',
            LineMan1: '',
            LineMan2: '',
            error: "",
            done: false,
            redirectVal: false
        };
        this.teams = [
            { value: 'Al Ahly', label: 'Al Ahly' },
            { value: 'Zamalek', label: 'Zamalek' },
            { value: 'El Gouna', label: 'El Gouna' },
            { value: 'Pyramids', label: 'Pyramids' },
            { value: 'Al Masry', label: 'Al Masry' },
            { value: 'ENPPI', label: 'ENPPI' },
            { value: 'Misr Lel Makkasa', label: 'Misr Lel Makkasa' },
            { value: 'Smouha', label: 'Smouha' },
            { value: 'Ceramica Cleopatra', label: 'Ceramica Cleopatra' },
            { value: 'National Bank', label: 'National Bank' },
            { value: 'Ghazl El Mahala', label: 'Ghazl El Mahala' },
            { value: 'Al Ittihad', label: 'Al Ittihad' },
            { value: 'Ismaily', label: 'Ismaily' },
            { value: 'El Gaish', label: 'El Gaish' },
            { value: 'Al Mokawloon', label: 'Al Mokawloon' },
            { value: 'Wadi Degla', label: 'Wadi Degla' },
            { value: 'E Entag El Harby', label: 'E Entag El Harby' }
        ]
        this.optionsVenue = [
            { value: 'Alexandria', label: 'Alexandria' },
            { value: 'Aswan', label: 'Aswan' },
            { value: 'Asyut', label: 'Asyut' },
            { value: 'Banha', label: 'Banha' },
            { value: 'Beni Suef', label: 'Beni Suef' },
            { value: 'Cairo', label: 'Cairo' },
            { value: 'Damanhur', label: 'Damanhur' },
            { value: 'Damietta', label: 'Damietta' },
            { value: 'El Mahalla El Kubra', label: 'El Mahalla El Kubra' },
            { value: 'Faiyum', label: 'Faiyum' },
            { value: 'Giza', label: 'Giza' },
            { value: 'Hurghada', label: 'Hurghada' },
            { value: 'Ismailia', label: 'Ismailia' },
            { value: 'Luxor', label: 'Luxor' },
            { value: 'Mansoura', label: 'Mansoura' },
            { value: 'Minya', label: 'Minya' },
            { value: 'Port Said', label: 'Port Said' },
            { value: 'Qena', label: 'Qena' },
            { value: 'Shubra El Kheima', label: 'Shubra El Kheima' },
            { value: 'Sohag', label: 'Sohag' },
            { value: 'Suez', label: 'Suez' },
            { value: 'Tanta', label: 'Tanta' },
            { value: 'Zagazig', label: 'Zagazig' }
        ];
        this.optionsMainReferee = [
            { value: 'Referee 1', label: 'Referee 1' },
            { value: 'Referee 2', label: 'Referee 2' },
            { value: 'Referee 3', label: 'Referee 3' },
            { value: 'Referee 4', label: 'Referee 4' },
            { value: 'Referee 5', label: 'Referee 5' },
            { value: 'Referee 6', label: 'Referee 6' },
            { value: 'Referee 7', label: 'Referee 7' },
            { value: 'Referee 8', label: 'Referee 8' },
            { value: 'Referee 9', label: 'Referee 9' },
            { value: 'Referee 10', label: 'Referee 10' }
        ];
        this.optionsLineMan = [
            { value: 'LineMan 1', label: 'LineMan 1' },
            { value: 'LineMan 2', label: 'LineMan 2' },
            { value: 'LineMan 3', label: 'LineMan 3' },
            { value: 'LineMan 4', label: 'LineMan 4' },
            { value: 'LineMan 5', label: 'LineMan 5' },
            { value: 'LineMan 6', label: 'LineMan 6' },
            { value: 'LineMan 7', label: 'LineMan 7' },
            { value: 'LineMan 8', label: 'LineMan 8' },
            { value: 'LineMan 9', label: 'LineMan 9' },
            { value: 'LineMan 10', label: 'LineMan 10' }
        ];
        this.handleSubmitMatch = this.handleSubmitMatch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name] : value });
    };

    async handleSubmitMatch(event) {
        event.preventDefault();
        if(this.state.LineMan1 === this.state.LineMan2)
        {
            this.setState({ error : "please, select two different line mans" });
        }
        else if(this.state.HomeTeam === this.state.AwayTeam)
        {
            this.setState({error : "please, select two different Teams" })
        }
        else{
            this.setState({
                error : '',
            });

            var dt = this.state.DateAndTime;
            dt.setHours( dt.getHours() + 2 );
            console.log(dt, typeof(dt));

            // console.log(this.state.MatchDate, d);

            axios.post(serverURL + '/CheckCreate',{
                DateAndTime: dt,
                // Time: this.state.MatchTime,
                Venue: this.state.Venue,
                Referee: this.state.MainReferee,
                Lineman1: this.state.LineMan1,
                Lineman2: this.state.LineMan2,
                HomeTeam: this.state.HomeTeam,
                AwayTeam: this.state.AwayTeam
            })
            .then(result => {
                console.log(result.data.length);
                console.log(result.data);
                if(result.data.length <= 1)
                {
                    var dt = this.state.DateAndTime;
                    dt.setHours( dt.getHours() - 2 );
                    console.log(dt, typeof(dt));
                    axios.post(serverURL + '/matches/CreateMatch',{
                        HomeTeam: this.state.HomeTeam,
                        AwayTeam: this.state.AwayTeam,
                        Venue: this.state.Venue,
                        MatchDate: dt,
                        // MatchTime: this.state.MatchTime,
                        MainReferee: this.state.MainReferee,
                        LineMan1: this.state.LineMan1,
                        LineMan2: this.state.LineMan2
                    }).then(result => {
                        if(result.data === "Success")
                        {
                            console.log("Success");
                            this.setState({
                                done : true
                            }); 
            
                            setTimeout( function() {
                                this.setState({
                                    redirectVal : true
                                }); 
                            }.bind(this), 3000)
                        }
                        else
                        {
                            this.setState({error: "failed to create Match"})
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                }
                else{
                    this.setState({ error: "Home Team, Away Team, Main Referee, LineMan1, LineMan2, or Venue is busy at this time, please select another one"});
                }
            })
            .catch(function(error) {
                console.log(error);
            });

        }
    }
    
    render() {
        return (
            <React.Fragment>
                <Header/>
                <br/>
                <div className="container border rounded">
                    <br/>
                    <h2 style={{color:"#3679be", textAlign:"center"}}> Create New Match Event </h2>
                    <Form onSubmit={this.handleSubmitMatch} className="m-20">
                        <FormGroup style={{fontWeight: 'bold', fontSize: 18}}>
                            <Label htmlFor="homeTeam" >Home Team : </Label>
                            <Select
                                placeholder={this.state.HomeTeam}
                                options={this.teams}
                                value={this.state.HomeTeam}
                                onChange={(input) => this.setState({HomeTeam: input.value})}
                            />
                        </FormGroup>

                        <FormGroup style={{fontWeight: 'bold', fontSize: 18}}>
                            <Label htmlFor="homeTeam">Away Team :</Label>
                            <Select
                                placeholder={this.state.AwayTeam}
                                options={this.teams}
                                value={this.state.AwayTeam}
                                onChange={(input) => this.setState({AwayTeam: input.value})}
                            />
                        </FormGroup>

                        <FormGroup style={{fontSize: 18, fontWeight: 'bold'}}>
                            <Label htmlFor="DateAndTime">Date And Time : &nbsp;</Label>
                            <br/>
                            <DateTimePicker onChange={date => this.setState({DateAndTime: date})} value={this.state.DateAndTime} format="yyyy-MM-dd h:mm:ss a" minDate={new Date()}/>
                            {/* <DatePicker selected={this.state.MatchDate} onChange={date => this.setState({MatchDate: date})} minDate={new Date()} />
                            <TimePicker selected={this.state.MatchTime} onChange={time => this.setState({MatchTime: time})} /> */}

                        </FormGroup>
                        <FormGroup style={{fontSize: 18, fontWeight: 'bold'}}>
                            <Label htmlFor="Venue" >Venue :</Label>
                            <Select
                                placeholder={this.state.Venue}
                                options={this.optionsVenue}
                                value={this.state.Venue}
                                onChange={(input) => this.setState({Venue: input.value})}
                            />
                        </FormGroup>
                        <FormGroup style={{fontSize: 18, fontWeight: 'bold'}}>
                            <Label htmlFor="MainReferee" >Main Referee :</Label>
                            <Select
                                placeholder={this.state.MainReferee}
                                options={this.optionsMainReferee}
                                value={this.state.MainReferee}
                                onChange={(input) => this.setState({MainReferee: input.value})}
                            />
                        </FormGroup>
                        <FormGroup style={{fontSize: 18, fontWeight: 'bold'}}>
                            <Label htmlFor="LineMan1" >Line Man1 :</Label>
                            <Select
                                placeholder={this.state.LineMan1}
                                options={this.optionsLineMan}
                                value={this.state.LineMan1}
                                onChange={(input) => this.setState({LineMan1: input.value})}
                            />
                        </FormGroup>
                        <FormGroup style={{fontSize: 18, fontWeight: 'bold'}}>
                            <Label htmlFor="LineMan2" >Line Man2 :</Label>
                            <Select
                                placeholder={this.state.LineMan2}
                                options={this.optionsLineMan}
                                value={this.state.LineMan2}
                                onChange={(input) => this.setState({LineMan2: input.value})}
                            />
                
                            <span style={{color:'red'}}> {this.state.error}</span>
                        </FormGroup>
                        {
                            this.state.done ? 
                                <div style={{color:'green', fontSize:17, textAlign:'center', fontStyle:'oblique'}}> Match Event is Created</div> :
                            null
                        }
                        {
                            this.state.redirectVal ? 
                            <Redirect to='/matches' />: null
                        }
                        <Button style={{width:'20%'}} size="lg" type="submit" value="submit" color="primary">Create</Button>
                    </Form>
                    <br/>
                </div>
                <br/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default withRouter(CreateMatch);