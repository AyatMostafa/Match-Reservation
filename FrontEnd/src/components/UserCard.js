import React from "react";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import InlineBlock from 'react-inline-block'

export class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.style = {
      float: 'right'
    }
  }

  render() {
    return (
        <Container>
            <Button variant="light">{this.props.username}</Button>
            <InlineBlock style={this.style}>
              {
                this.props.Approved ? null : 
                <Button variant="success" onClick={() => this.props.ApproveUser(this.props.username)}>Approve</Button> 
              }
              &nbsp;
              <Button variant="danger" onClick={() => this.props.DeleteUser(this.props.username)}>Delete</Button>
              
            </InlineBlock>
        </Container>
    );
  }
}
export default UserCard;