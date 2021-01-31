import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { FadeTransform} from 'react-animation-components';

const serverURL = "http://localhost:5000";


function matchDetails ({match, num}) {
    return (
        <Card>
            <Link to={`/matches/${match.id}`} >
                <FadeTransform in transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <CardHeader className="bg-primary text-white">Match Event + {num} </CardHeader>
                    <CardBody>
                        <dl className="row p-1">
                            <dt className="col-6">Home Team: </dt>
                            <dd className="col-6">{ match.HomeTeam } </dd>
                            <dt className="col-6">Away Team: </dt>
                            <dd className="col-6">{ match.AwayTeam }</dd>
                            <dt className="col-6">Venue:</dt>
                            <dd className="col-6"> {match.Venue} </dd>
                            <dt className="col-6"> Date And Time :</dt>
                            <dd className="col-6"> {match.DateAndTime} </dd>
                            <dt className="col-6"> Main Referee:</dt>
                            <dd className="col-6"> {match.MainReferee} </dd>
                            <dt className="col-6"> Line Man1:</dt>
                            <dd className="col-6"> {match.LineMan1} </dd>
                            <dt className="col-6"> Line Man2:</dt>
                            <dd className="col-6"> {match.LineMan2} </dd>
                        </dl>
                    </CardBody>
                </FadeTransform>
            </Link>
        </Card>
        
    );
    // <Card onClick={() => onClick(dish.id)}> 
} 

function showMatches (matches)
{
    matches.map((match) => {
        return (
            <div className="col-12 col-md-5 m-1"  key={match.id}>
                <matchDetails match={match} num={num}/>
            </div>
        );
    });
}

class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isManager: true,
            token: this.getToken(),
            matches: []
        };
        this.getToken = this.getToken.bind(this);
    }
    getToken(){
        return sessionStorage.getItem('token');
    }

    componentDidMount()
    {
        this.setState({
            matches: [{
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
        //         matches = response.data;
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
                    <showMatches matches={this.props.matches} />
                </div>
            </div>
        );
    }
}

export default withRouter(Match);