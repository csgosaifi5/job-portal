import React from "react";
import Slider from "@/components/shared/Slider";

const Testimonials = () => {
  const postBlog = [
    {
      image: "/images/testimonials/pic1.jpg",
      text:"I am really happy with the services we are getting; I really want to appreciate your prompt response attitude and can-do nature. As I totally understand the pain in our entire interview cycle it is not easy, you may have got 100 of rejections due to assignment however we have got amazing people too from this list, who are really doing well, I would say your hard work is paid off.",
      client:"Misba Shaikh",
      title:"HR Business Partner",
      company:"Husqvarna Group"
    },
    {
      image: "/images/testimonials/pic2.jpg",
      text:"Derive Management Solutions has consistently impressed us with their unwavering commitment, timely delivery, and remarkable speed in closing critical positions. Their dedication to understanding our needs and swiftly sourcing top talent has significantly reduced our time-to-fill, ensuring we meet our recruitment targets with ease. Trustworthy, efficient, and results driven, derive is an invaluable partner in our talent acquisition strategy. I collaborated closely with Nisha Saini, Recruitment Lead at Derive, who assisted us in successfully filling several crucial positions during our extensive hiring efforts in Chennai and Bangalore. Raghunath Kumar, the Founder of Derive, consistently demonstrates helpfulness and dedication in delivering results. I wish the Derive team great success and look forward to our continued partnership",
      client:"Pallavi Choudhary",
      title:"Associate Director",
      company:"RAPP an Omnicom Group company"
    },
    {
      image: "/images/testimonials/pic1.jpg",
      text:"I am really happy with the services we are getting; I really want to appreciate your prompt response attitude and can-do nature. As I totally understand the pain in our entire interview cycle it is not easy, you may have got 100 of rejections due to assignment however we have got amazing people too from this list, who are really doing well, I would say your hard work is paid off.",
      client:"Misba Shaikh",
      title:"HR Business Partner",
      company:"Husqvarna Group"
    },
    {
      image: "/images/testimonials/pic2.jpg",
      text:"Derive Management Solutions has consistently impressed us with their unwavering commitment, timely delivery, and remarkable speed in closing critical positions. Their dedication to understanding our needs and swiftly sourcing top talent has significantly reduced our time-to-fill, ensuring we meet our recruitment targets with ease. Trustworthy, efficient, and results driven, derive is an invaluable partner in our talent acquisition strategy. I collaborated closely with Nisha Saini, Recruitment Lead at Derive, who assisted us in successfully filling several crucial positions during our extensive hiring efforts in Chennai and Bangalore. Raghunath Kumar, the Founder of Derive, consistently demonstrates helpfulness and dedication in delivering results. I wish the Derive team great success and look forward to our continued partnership",
      client:"Pallavi Choudhary",
      title:"Associate Director",
      company:"RAPP an Omnicom Group company"
    },
    
  ];
  const settings = {
    slidesToShow: 3,
    arrows: false,
    infinite: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Slider className="blog-carousel-center owl-carousel owl-none " {...settings}>
      {postBlog.map((item, index) => (
        <div className="item p-3" key={index}>
          <div className="testimonial-5">
            <div className="testimonial-text">
              <p style={{height:"350px", overflow:"hidden",}}>
                {item.text}
              </p>
            </div>
            <div className="testimonial-detail clearfix">
              <div className="testimonial-pic radius shadow">
                <img src={item.image} width="100" height="100" alt="" />
              </div>
              <strong className="testimonial-name">{item.client}</strong>
              <span className="testimonial-position">{item.title}</span>
              <span className="testimonial-position">{item.company}</span>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonials;
