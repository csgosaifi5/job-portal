import React from 'react'
import Link from 'next/link'

const widgetPost=[
	{ image: '/images/blog/recent-blog/pic1.jpg',
	  title : '11 Tips to Help You Get New Clients Through Cold Calling',
	},
	{ image: '/images/blog/recent-blog/pic2.jpg',
	  title : 'Do you have a job that the average person doesn’t even know exists?',
	},
	{ image: '/images/blog/recent-blog/pic3.jpg',
	  title : 'Using Banner Stands To Increase Trade Show Traffic',
	},
]
const dzPost=[
	{ image: '/images/gallery/pic2.jpg' },
	{ image: '/images/gallery/pic1.jpg' },
	{ image: '/images/gallery/pic5.jpg' },
	{ image: '/images/gallery/pic7.jpg' },
	{ image: '/images/gallery/pic8.jpg' },
	{ image: '/images/gallery/pic9.jpg' },
]
const BlogSidebar = () => {
    return(
		<aside  className="side-bar">
			<div className="widget">
				<h6 className="widget-title style-1">Search</h6>
				<div className="search-bx style-1">
					<form role="search" method="post">
						<div className="input-group">
							<input name="text" className="form-control" placeholder="Enter your keywords..." type="text" />
							<span className="input-group-btn">
								<button type="submit" className="fa fa-search text-primary"></button>
							</span> 
						</div>
					</form>
				</div>
			</div>
			<div className="widget recent-posts-entry">
				<h6 className="widget-title style-1">Recent Posts</h6>
				<div className="widget-post-bx">
					{widgetPost.map((item,index)=>(	
						<div className="widget-post clearfix" key={index}>
							<div className="dez-post-media"> 
								<img src={item.image} width="200" height="143" alt="" /> 
							</div>
							<div className="dez-post-info">
								<div className="dez-post-header">
									<h6 className="post-title"><Link href={"/blog-details"}></Link>{item.title}</h6>
								</div>
								<div className="dez-post-meta">
									<ul className="d-flex align-items-center">
										<li className="post-date"><i className="fa fa-calendar"></i>Sep 18, 2017</li>
										<li className="post-comment"><Link href={'#'}><i className="fa fa-comments-o"></i>5k</Link> </li>
									</ul>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			
			<div className="widget widget_archive">
				<h6 className="widget-title style-1">Categories List</h6>
				<ul>
					<li><Link href={"#"}>aciform</Link></li>
					<li><Link href={"#"}>championship</Link></li>
					<li><Link href={"#"}>chastening</Link></li>
					<li><Link href={"#"}>clerkship</Link></li>
					<li><Link href={"#"}>disinclination</Link></li>
				</ul>
			</div>
			{/* <div className="widget widget-newslatter">
				<h6 className="widget-title style-1">Newsletter</h6>
				<div className="news-box">
					<p>Enter your e-mail and subscribe to our newsletter.</p>
					<form className="dzSubscribe" action="script/mailchamp.php" method="post">
						<div className="dzSubscribeMsg"></div>
						<div className="input-group">
							<input name="dzEmail" type="email" className="form-control" placeholder="Your Email" />
							<button name="submit" value="Submit" type="submit" className="site-button btn-block">Subscribe Now</button>
						</div>
					</form>
				</div>
			</div> */}
		</aside>
	)
}

export default BlogSidebar