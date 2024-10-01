import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Notifications

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

// All Dynamic Route DJF LAW FIRM
const HomeList = React.lazy(() => import('./views/pages/allpages/home/HomeSectionList'))
const HomeHeroBanner = React.lazy(() => import('./views/pages/allpages/home/HomeHeroBanner'))
const HomeAboutSection = React.lazy(() => import('./views/pages/allpages/home/HomeAboutSection'))
const HomeTalkToUsSection = React.lazy(() =>
  import('./views/pages/allpages/home/HomeTalkToUsSection'),
)

const HomePracticeSection = React.lazy(() =>
  import('./views/pages/allpages/home/HomePracticeSection'),
)
const HomeChooseUsSection = React.lazy(() =>
  import('./views/pages/allpages/home/HomeChooseUsSection'),
)

const HomeAwardsSection = React.lazy(() => import('./views/pages/allpages/home/HomeAwardsSection'))
const HomeInjurySection = React.lazy(() => import('./views/pages/allpages/home/HomeInjurySection'))

//Main Pages Components
const AboutBanner = React.lazy(() => import('./views/pages/allpages/about-us/AboutBanner'))

const ContactDetails = React.lazy(() => import('./views/pages/allpages/contact-us/ContactDetails'))

const ServicesMainPage = React.lazy(() => import('./views/pages/allpages/services/ServicePage'))
const BlogsMainPage = React.lazy(() => import('./views/pages/allpages/blogs/BlogsPage'))

const ContactFormList = React.lazy(() => import('./views/pages/contactForm/ContactFormList'))

// Blogs
const BolgsList = React.lazy(() => import('./views/pages/allpages/blogs/BlogsList'))
const AddBlog = React.lazy(() => import('./views/pages/allpages/blogs/AddBolg'))

const MetaBolgsList = React.lazy(() => import('./views/pages/allpages/meta-pages/blogs/BlogList'))
const MetaBlog = React.lazy(() => import('./views/pages/allpages/meta-pages/blogs/MetaBlogs'))
const BlogsBanner = React.lazy(() => import('./views/pages/allpages/meta-pages/blogs/BlogsBanner'))

// Services
const ServicesList = React.lazy(() => import('./views/pages/allpages/services/ServicesList'))
const AddService = React.lazy(() => import('./views/pages/allpages/services/AddService'))

//comments
const CommnetList = React.lazy(() => import('./views/pages/allpages/comments/CommentsList'))
const AddCommnet = React.lazy(() => import('./views/pages/allpages/comments/AddComments'))

//testimonials
const TestimonialsList = React.lazy(() =>
  import('./views/pages/allpages/testimonials/TestimonialList'),
)
const AddTestimonial = React.lazy(() =>
  import('./views/pages/allpages/testimonials/AddTestimonial'),
)
const MetaTestimonialList = React.lazy(() =>
  import('./views/pages/allpages/meta-pages/testimonials/TestiMetaList'),
)
const MetaTestimonial = React.lazy(() =>
  import('./views/pages/allpages/meta-pages/testimonials/MetaTestimonial'),
)

const TestimonialBanner = React.lazy(() =>
  import('./views/pages/allpages/meta-pages/testimonials/TestimonialBanner'),
)

// Sitemap
const SitemapList = React.lazy(() =>
  import('./views/pages/allpages/meta-pages/sitemap/SitemapList'),
)
const MetaSitemap = React.lazy(() =>
  import('./views/pages/allpages/meta-pages/sitemap/MetaSitemap'),
)
const SitemapBanner = React.lazy(() =>
  import('./views/pages/allpages/meta-pages/sitemap/SitemapBanner'),
)

const MetaNewsList = React.lazy(() => import('./views/pages/allpages/meta-pages/news/MetaNewsList'))
const MetaNews = React.lazy(() => import('./views/pages/allpages/meta-pages/news/MetaNews'))

const routes = [
  //Main Pages
  { path: '/about-us', name: 'Edit About Us Page', element: AboutBanner },

  { path: '/contact-us', name: 'Edit Contact Us Page', element: ContactDetails },

  { path: '/services', name: 'Edit Services Page', element: ServicesMainPage },
  { path: '/blogs', name: 'Edit Services Page', element: BlogsMainPage },

  //Meta News Section
  { path: '/', exact: true, name: 'Home' },
  { path: '/home/list', name: 'Edit Home', element: HomeList },
  { path: '/edit/home/banner/:id', name: 'Edit Home Banner', element: HomeHeroBanner },
  { path: '/edit/home/about/:id', name: 'Edit Home About', element: HomeAboutSection },
  {
    path: '/edit/home/practiceareas/:id',
    name: 'Edit Home Practice',
    element: HomePracticeSection,
  },
  {
    path: '/edit/home/chooseus/:id',
    name: 'Edit Home Choose Us',
    element: HomeChooseUsSection,
  },
  {
    path: '/edit/home/awards/:id',
    name: 'Edit Awards Section',
    element: HomeAwardsSection,
  },
  { path: '/edit/home/injuries/:id', name: 'Edit Home Injury', element: HomeInjurySection },
  { path: '/edit/home/talktous/:id', name: 'Edit Home Jokes', element: HomeTalkToUsSection },

  //Meta Blog Section
  { path: '/blogs/list', name: 'Edit Blogs', element: MetaBolgsList },
  { path: '/edit/blogs/meta-tags-detail/:id', name: 'Edit Meta Tags', element: MetaBlog },
  { path: '/edit/blogs/banner/:id', name: 'Edit Banner', element: BlogsBanner },

  //Meta Sitemap Section
  { path: '/sitemap/list', name: 'Edit Sitemap', element: SitemapList },
  { path: '/edit/sitemap/meta-tags-detail/:id', name: 'Edit Meta Tags', element: MetaSitemap },
  { path: '/edit/sitemap/banner/:id', name: 'Edit Banner', element: SitemapBanner },

  //Meta Testimonials Section
  { path: '/testimonials/list', name: 'Edit Testimonials', element: MetaTestimonialList },
  {
    path: '/edit/testimonials/meta-tags-detail/:id',
    name: 'Edit Meta Tags',
    element: MetaTestimonial,
  },
  { path: '/edit/testimonials/banner/:id', name: 'Edit Banner', element: TestimonialBanner },

  //Blogs routes

  { path: '/blogs/list-all', name: 'Blogs', element: BolgsList },
  { path: '/blogs/add', name: 'Add New Blog', element: AddBlog },
  { path: '/blogs/edit/:id', name: 'Edit Blog', element: AddBlog },

  //Services routes

  { path: '/services/list-all', name: 'Services', element: ServicesList },
  { path: '/services/add', name: 'Add New Service', element: AddService },
  { path: '/services/edit/:id', name: 'Edit Service', element: AddService },

  //Testimonials routes

  { path: '/testimonials/list-all', name: 'Testimonials', element: TestimonialsList },
  { path: '/testimonials/add', name: 'Add New Testimonial', element: AddTestimonial },
  { path: '/testimonials/edit/:id', name: 'Edit Testimonial', element: AddTestimonial },

  //Contact form List
  { path: '/contact-form/list', name: 'Contact List', element: ContactFormList },

  //Commnets section
  { path: '/comments/list-all', name: 'Comments Section', element: CommnetList },
  { path: '/comments/:id', name: 'Edit Comment', element: AddCommnet },

  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },

  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
