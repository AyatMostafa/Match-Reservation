import React, { Component } from 'react';
import axios from 'axios';
import { Label, FormGroup, Button, Form  } from 'reactstrap';
import DateTimePicker from 'react-datetime-picker';
import TimePicker from 'react-time-picker';
import DatePicker from "react-datepicker";
import Select from "react-select";
import {withRouter} from 'react-router-dom';
import 'react-datetime-picker/dist/DateTimePicker.css';

const serverURL = "http://localhost:5000";

class EditMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            done: false,
            redirectVal: false,
            Home: this.props.matchh.match.HomeTeam,
            Away: this.props.matchh.match.AwayTeam,
            Date: new Date(this.props.matchh.match.DateAndTime),
            // Time: this.props.matchh.match.MatchHour.toString() + ':' + this.props.matchh.match.MatchMin.toString(),
            Ven: this.props.matchh.match.Venue,
            Referee: this.props.matchh.match.MainReferee,
            Line1: this.props.matchh.match.LineMan1,
            Line2: this.props.matchh.match.LineMan2,
            oldVenue: this.props.matchh.match.Venue,
            oldDate: new Date(this.props.matchh.match.DateAndTime),
            // oldTime: this.props.matchh.match.MatchHour.toString() + ':' + this.props.matchh.match.MatchMin.toString()
        };
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
        this.editMatch = this.editMatch.bind(this);
    }

    // componentDidMount(){
    //     console.log(typeof(this.state.Date));
    //     console.log(typeof(this.state.Time));
    //     // var calcdate = new Date(this.props.matchh.match.DateAndTime);
    //     // calcdate.setHours(calcdate.getHours() - 2);
    //     // this.setState({Date : calcdate});
    // }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name] : value });
    };

    async editMatch(){
        axios.put(serverURL + '/EditMatch',{
                Venue: this.state.Ven,
                Date: this.state.Date,
                // Time: this.state.Time,
                MainReferee: this.state.Referee,
                LineMan1: this.state.Line1,
                LineMan2: this.state.Line2,
                idVenue: this.state.oldVenue,
                idDate: this.state.oldDate,
                // idTime: this.state.oldTime
            })
            .then(result => {
                if(result.data === "Success")
                {
                    this.setState({ done : true }); 
                    setTimeout( function() {
                        this.props.completeEdit();
                    }.bind(this), 3000)
                }
                else if(result.data === "Failed")
                {
                    this.setState({error: "Failed to update Match Event"});
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    async handleSubmitMatch(event) {
        event.preventDefault();
        if(this.state.Line1 === this.state.Line2)
        {
            this.setState({
                error : "please, select two different line mans"
            });
        }
        else
        {
            this.setState({ error : "" });
            // var calcdate = this.state.Date;
            // calcdate.setHours(calcdate.getHours() + 2);
            // this.setState({Date : new Date(calcdate)});

            axios.post(serverURL + '/CheckEdit',{
                Date: this.state.Date,
                // Time: this.state.Time,
                Venue: this.state.Ven,
                Referee: this.state.Referee,
                Lineman1: this.state.Line1,
                Lineman2: this.state.Line2
            })
            .then(result => {
                console.log(result.data.length);
                console.log(result.data);
                if(result.data.length <= 1)
                {
                    this.editMatch();
                }
                else{
                    this.setState({ error: "Main Referee, LineMan1, LineMan2, or Venue is busy at this time, please select another one"});
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
                <br/>
                <div className="container border rounded">
                    <br/>
                    {/* <h2 style={{color:"#3679be", textAlign:"center"}}> Edit Match Event </h2> */}
                    <Form onSubmit={this.handleSubmitMatch} className="m-20">
                        <FormGroup>
                            <Label htmlFor="homeTeam" style={{fontWeight: 'bold', fontSize: 18}}>Home Team : {this.state.Home}</Label>

                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="homeTeam"style={{fontWeight: 'bold', fontSize: 18}} >Away Team : {this.state.Away}</Label>

                        </FormGroup>

                        <FormGroup style={{fontSize: 18}}>
                            <Label htmlFor="DateAndTime">Date And Time : &nbsp;</Label>
                            <DateTimePicker onChange={date => this.setState({Date: date})} value={this.state.Date} format="y-MM-dd h:mm:ss a" minDate={new Date()}/>
                            {/* <DatePicker selected={this.state.Date} onChange={date => this.setState({Date: date})} />
                            <TimePicker value={this.state.Time} onChange={time => this.setState({Time: time})} /> */}
                        </FormGroup>

                        <FormGroup style={{fontSize: 18}}>
                            <Label htmlFor="Venue" >Venue :</Label>
                            <Select
                                placeholder={this.state.Ven}
                                options={this.optionsVenue}
                                value={this.state.Ven}
                                onChange={(input) => this.setState({Ven: input.value})}
                            />
                        </FormGroup>
                        <FormGroup style={{fontSize: 18}}>
                            <Label htmlFor="MainReferee" >Main Referee :</Label>
                            <Select
                                placeholder={this.state.Referee}
                                options={this.optionsMainReferee}
                                value={this.state.Referee}
                                onChange={(input) => this.setState({Referee: input.value})}
                            />
                        </FormGroup>
                        <FormGroup style={{fontSize: 18}}>
                            <Label htmlFor="LineMan1" >Line Man1 :</Label>
                            <Select
                                placeholder={this.state.Line1}
                                options={this.optionsLineMan}
                                value={this.state.Line1}
                                onChange={(input) => this.setState({Line1: input.value})}
                            />
                        </FormGroup>
                        <FormGroup style={{fontSize: 18}}>
                            <Label htmlFor="LineMan2" >Line Man2 :</Label>
                            <Select
                                placeholder={this.state.Line2}
                                options={this.optionsLineMan}
                                value={this.state.Line2}
                                onChange={(input) => this.setState({Line2: input.value})}
                            /> 
                            
                            <span style={{color:'red'}}> {this.state.error} </span>
                        
                        </FormGroup>
                        {
                            this.state.done ? 
                                <div style={{color:'green', fontSize:17, textAlign:'center'}}> Match Event is updated</div>                            :
                            null
                        }
                        <Button style={{width:'20%'}} type="submit" value="submit" color="primary">Edit</Button>
                    </Form>
                    <br/>
                </div>
                <br/>
            </React.Fragment>
        );
    }
}

export default withRouter(EditMatch);