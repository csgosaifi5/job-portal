import React from 'react'
import Slider from "@/components/shared/Slider";
import Link from "next/link";
import CommonService from "@/services/CommonService";
import util from '@/util/util';

const LatestBlogs = async() => {


    const commServ = new CommonService();
    let latestBlog = [];
    let blogsCount = null;
    let search = {
      start: 0,
      perPage: 6,
    };
  
    let result = await commServ.listAll(search, "blogs", "PATCH");
  
    if (result && result.rows) {
      latestBlog = result.rows;
      blogsCount = result.count;
    }


    function NextArrow(props:any) {
      const { onClick } = props;
      return (
          <div className="owl-nav">
            <div className="owl-next la la-angle-right "  onClick={onClick}/>
        </div>	
      );
    }
    
    function PrevArrow(props:any) {
      const { onClick } = props;
      return (
        <div className="owl-nav">
            <div className=" owl-prev la la-angle-left " onClick={onClick}/>
        </div>
      );
    }
   const settings = {		
        arrows: true,
        slidesToShow: 3,			
        infinite: true,
        autoplay: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
              }
            }
        ]
    };
  return (
    <Slider className="blog-carousel owl-carousel owl-btn-center-lr owl-btn-3 owl-theme owl-btn-center-lr owl-btn-1 " {...settings}>
    {latestBlog.map((item:BlogAttributes, index:number) => (
        <div className="item p-3" key={index}>
            <div className="blog-post blog-grid blog-style-1">
                <div className="dez-post-media dez-img-effect radius-sm"> <Link href={`/blog-details/${item.slug}`}><img src={item.image} alt="" /></Link> </div>
                <div className="dez-info">
                     <div className="dez-post-meta">
                        <ul className="d-flex align-items-center">
                            <li className="post-date"><i className="fa fa-calendar"></i>{util.formatDate(item.createdAt)}</li>
                            <li className="post-comment"><i className="fa fa-comments-o"></i><Link href={"#"}>5k</Link> </li>
                        </ul>
                    </div>
                    <div className="dez-post-title ">
                        <h5 className="post-title font-20"><Link href={`/blog-details/${item.slug}`}>{item.title}</Link></h5>
                    </div>
                    {/* <div className="dez-post-text">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                    </div> */}
                    <div className="dez-post-readmore blog-share"> 
                        <Link href={`/blog-details/${item.slug}`} title="READ MORE" rel="bookmark" className="site-button-link"><span className="fw6">READ MORE</span></Link>
                    </div>
                </div>
            </div>
        </div>
    ))}
    
</Slider>
  )
}

export default LatestBlogs