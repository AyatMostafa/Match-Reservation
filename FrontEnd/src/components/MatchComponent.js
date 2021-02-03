import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Breadcrumb, BreadcrumbItem, Button  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
// import { FadeTransform} from 'react-animation-components';

const serverURL = "http://localhost:5000";


function MatchDetails ({match, num, is_Maganger}) {
    return (
        <Card>
            {/* <FadeTransform in transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}> */}
                <CardHeader className="bg-info text-white" style = {{ fontWeight: 'bold', fontSize: 20 }}>Match Event: {num} </CardHeader>
                <CardBody>
                    <dl className="row p-1" style={{color:"black"}}>
                        <dt className="col-6 ">Home Team : </dt>
                        <dd className="col-6">{ match.HomeTeam } </dd>
                        <dt className="col-6">Away Team : </dt>
                        <dd className="col-6">{ match.AwayTeam }</dd>
                        <dt className="col-6">Venue :</dt>
                        <dd className="col-6"> {match.Venue} </dd>
                        <dt className="col-6"> Date And Time :</dt>
                        <dd className="col-6"> {match.DateAndTime} </dd>
                        <dt className="col-6"> Main Referee :</dt>
                        <dd className="col-6"> {match.MainReferee} </dd>
                        <dt className="col-6"> Line Man1 :</dt>
                        <dd className="col-6"> {match.LineMan1} </dd>
                        <dt className="col-6"> Line Man2 :</dt>
                        <dd className="col-6"> {match.LineMan2} </dd>
                    </dl>
                    {   is_Maganger ?
                        <Link to={`/matches/${match.id}`}> 
                            <Button className="bg-dark" ><span className="fa fa-edit fa-m"></span> Edit Event</Button>
                        </Link>
                        : <div></div>
                    }
                </CardBody>
        </Card>
        
    );
} 


class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isManager: false,
            token: "Ayat_M",
            matches: []
        };
        this.getToken = this.getToken.bind(this);
    }
    getToken(){
        return sessionStorage.getItem('token');
    }

    componentDidMount()
    {
        if(this.state.token === '' || this.state.token === null)
        {
            this.setState({
                isMaganger: false
            });
        }
        else if(this.state.token.charAt(this.state.token.length-1) === 'M')
        {
            this.setState({
                isMaganger: true
            });
        }
        
        this.setState({
            matches: [{
                id: 11,
                HomeTeam: "Ahly",
                AwayTeam: "Zalamk",
                Venue: "Cairo",
                DateAndTime: "12 Jan. 2020 12:00:00",
                MainReferee: "Jon Mark",
                LineMan1: "David",
                LineMan2: "Messy"
            },
            {
                id: 12,
                HomeTeam: "Ahly",
                AwayTeam: "Zalamk",
                Venue: "Cairo",
                DateAndTime: "12 Jan. 2020 12:00:00",
                MainReferee: "Jon Mark",
                LineMan1: "David",
                LineMan2: "Messy"
            },
            {
                id: 13,
                HomeTeam: "Ahly",
                AwayTeam: "Zalamk",
                Venue: "Cairo",
                DateAndTime: "12 Jan. 2020 12:00:00",
                MainReferee: "Jon Mark",
                LineMan1: "David",
                LineMan2: "Messy"
            }]
        });
        // axios.post(serverURL + '/matches',{
        // })
        // .then(response => {
        //     if(response.completed === "Success")
        //     {
                    // this.setState({
                    //     matches: response.data
                    // });
        //     }
        //     // else
        //     // {    
        //     // }
        // })
        // .catch(function(error) {
        //     console.log(error);
        // });
    }
    
    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Matches</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Matches</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        {this.state.matches.map((match, index) =>(
                        // <CarrouselItem imageUrl={image} key={index} />
                            <div className="col-12 col-md-5 m-1 mb-5"  key={index}>
                                <MatchDetails match={match} num={index+1} is_Maganger={this.state.isMaganger}/>
                            </div>
                        ))}
                        
                    </div>
                </div>
                <Footer/>
            </React.Fragment>

        );
    }
}

export default withRouter(Match);