import axios from "axios";
import React from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import UserCard from './UserCard'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Redirect } from "react-router-dom";

const serverURL = "http://localhost:5000";

export class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        users: []
    };
    this.token = this.getToken();
    this.fetchUsers = this.fetchUsers.bind(this);
    this.ApproveUser = this.ApproveUser.bind(this);
    this.DeleteUser = this.DeleteUser.bind(this);
    this.getToken = this.getToken.bind(this);

    this.fetchUsers();
  }
  async fetchUsers(){
      axios.get(serverURL + '/nonAdminUsers').then(
          result =>{
              var newList = [];
              for(var i = 0; i < result.data.length; i++)
                newList.push(result.data[i]);
              this.setState({users: newList});
          }
      )
  }
  async DeleteUser(username){
    axios.delete(serverURL + '/users/DeleteUser/' + username)
    .then(result => {
      if(result.data === "Success")
        this.fetchUsers();
    });
  };
  async ApproveUser(username){
    axios.put(serverURL + '/users/ApproveUser/' + username)
    .then(result => {
      if(result.data === "Success")
        this.fetchUsers();
    });
  };

  getToken(){
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken ? userToken : '';
  }
  render() {
    return (
        <div>
          <Header />
          {   this.token && this.token.charAt(this.token.length-1) == 'A'? 
                <ListGroup>
                  {
                  this.state.users.map((user) => (
                      <ListGroup.Item action variant="light" id={user.UserName}>
                          <UserCard Approved={user.Approved === 'Y'} username={user.UserName} ApproveUser={this.ApproveUser} DeleteUser={this.DeleteUser}/> 
                      </ListGroup.Item>
                  ))
                  }
                </ListGroup>
                : <Redirect to="/" />
          }
          
          <Footer />
        </div>
    );
  }
}
export default UserList;