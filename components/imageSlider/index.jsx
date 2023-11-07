"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import React, { Component } from "react";
import Slider from "react-slick";

export default class ImagesSlider extends Component {
  render() {
     // Destructure images from props

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
    };

    return (
      <div>
        <Slider {...settings}>
          <div>
            <Image
              src="/images/banner/qnc_banner_1.png"
              alt="123"
              layout="fill"
              objectFit="cover"
              quality={100} // Adjust the quality as needed
            />
          </div>
          <div>
            <Image
              src="/images/banner/qnc_banner_1.png"
              alt="123"
              layout="fill"
              objectFit="cover"
              quality={100} // Adjust the quality as needed
            />
          </div>
          <div>
            <Image
              src="/images/banner/qnc_banner_1.png"
              alt="123"
              layout="fill"
              objectFit="cover"
              quality={100} // Adjust the quality as needed
            />
          </div>
          <div>
            <Image
              src="/images/banner/qnc_banner_1.png"
              alt="123"
              layout="fill"
              objectFit="cover"
              quality={100} // Adjust the quality as needed
            />
          </div>
          <div>
            <Image
              src="/images/banner/qnc_banner_1.png"
              alt="123"
              layout="fill"
              objectFit="cover"
              quality={100} // Adjust the quality as needed
            />
          </div>
          <div>
            <Image
              src="/images/banner/qnc_banner_1.png"
              alt="123"
              layout="fill"
              objectFit="cover"
              quality={100} // Adjust the quality as needed
            />
          </div>
          <div>
            <Image
              src="/images/banner/qnc_banner_1.png"
              alt="123"
              layout="fill"
              objectFit="cover"
              quality={100} // Adjust the quality as needed
            />
          </div>
          <div>
            <Image
              src="/images/banner/qnc_banner_1.png"
              alt="123"
              layout="fill"
              objectFit="cover"
              quality={100} // Adjust the quality as needed
            />
          </div>
        </Slider>
      </div>
    );
  }
}
