import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import EditMatch from './EditMatch';

const serverURL = "http://localhost:5000";


class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isManager: false,
            token: this.getToken(),
            isEditOpen: false,
            matches: [],
            ClickedMatch: {}
        };
        this.getToken = this.getToken.bind(this);
        this.showMatches = this.showMatches.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.showAll = this.showAll.bind(this);
    }

    getToken(){
        return sessionStorage.getItem('token');
    }

    toggleEdit(num) {
        this.setState({
            isEditOpen: !this.state.isEditOpen,
            // ClickedMatch: match
        });
        // console.log(num);
    }

    showAll(matchh)
    {
        this.setState({ ClickedMatch: matchh });
        this.toggleEdit(1);
    }

    async showMatches(){
        axios.post(serverURL + '/matches').then(
            result => {
            if(typeof result.data !== 'undefined' && result.data)
            {
                var newList = [];
                for(var i = 0; i < result.data.length; i++)
                    newList.push(result.data[i]);
                this.setState({ matches: newList});
            }
            }
        )
    }

    componentDidMount()
    {
        if(this.state.token === '' || this.state.token === null)
            this.setState({ isManager: false});
        else if(this.state.token.slice(-2,-1) === "M")
            this.setState({ isManager: true });
        
        this.showMatches();
    }
    
    render() {
        const MatchDetails = ({match, num, is_Manager}) => 
        {
            return(
                <Card>
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
                        {   is_Manager ?
                            // <Link to={`/matches/EditMatch/${{'Venue': match.Venue, 'Date': match.DateAndTime}}`}> 
                                <Button className="bg-dark" onClick={() => { console.log({match}); this.showAll({match}) }} ><span className="fa fa-edit fa-m"></span> Edit Event</Button>
                            // </Link>
                            : <div></div>
                        }
                        
                        <Link to={`/stadium/${match.Venue}`}> 
                            <Button className="bg-dark" style={{float:'right'}}>View seats</Button>
                        </Link>
                            
                        
                    </CardBody>
                </Card>
            );
        }

        return (
            <React.Fragment>
                <Header/>
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home"> Home </Link></BreadcrumbItem>
                            <BreadcrumbItem active> Matches </BreadcrumbItem>
                            {
                                this.state.isManager ? 
                                    <BreadcrumbItem> <Link to="/matches/createMatch"> Create New Match </Link> </BreadcrumbItem> 
                                : null    
                            }
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Matches</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        {this.state.matches.map((match, index) =>(
                            <div className="col-12 col-md-5 m-1 mb-5"  key={index}>
                                <MatchDetails match={match} num={index+1} is_Manager={this.state.isManager}/>
                            </div>
                        ))}
                        
                    </div>
                </div>
                <Footer/>
                <Modal isOpen={this.state.isEditOpen} toggle={this.toggleEdit}>
                    <ModalHeader toggle={this.toggleEdit}> Edit Match Event </ModalHeader>
                    <ModalBody>
                        {/* {
                            console.log(this.state.ClickedMatch)
                        } */}
                        <EditMatch matchh={this.state.ClickedMatch}/>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}
export default withRouter(Match);