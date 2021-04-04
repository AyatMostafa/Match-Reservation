import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { withRouter } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

import image1 from "./im1.jpg";
import image2 from "./img2.jpeg";
import image3 from "./img3.jpg";
function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-50 m-auto mx-auto"
            src={image1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-50 m-auto"
            src={image2}
            alt="Second slide"
          />

        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-50 m-auto"
            src={image3}
            alt="Third slide"
          />
  
        </Carousel.Item>
      </Carousel>
    );
  }

class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="mt-10">
                    <br></br>
                </div>
                <row>
                <ControlledCarousel/>
                </row>
                <div className="mt-10">
                    <br></br>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(Home);