import React, {useState} from 'react';
import Link from "next/link";
const jobAlert= [
	{ id:1,title:'Social Media Expert',	date:'December 15,2018',},
	{ id:2,title:'Web Designer',	date:'November 10,2018',},
	{ id:3,title:'Finance Accountant',	date:'October 5,2018',},
	{ id:4,title:'Social Media Expert',	date:'December 15,2018',},
	{ id:5,title:'Web Designer',	date:'November 10,2018',},
	{ id:6,title:'Finance Accountant',	date:'October 5,2018',},
	{ id:7,title:'Social Media Expert',	date:'December 15,2018',},
	{ id:8,title:'Web Designer',	date:'November 10,2018',},
	{ id:9,title:'Finance Accountant',	date:'October 5,2018',},
	{ id:10,title:'Social Media Expert',	date:'December 15,2018',},
]

const ApplicantJobAlert = () => {
    const [company, setCompany]= useState(false);
	const [contacts, setContacts] = useState(jobAlert);
	// delete data  
    const handleDeleteClick = (contactId:any) => {
        const newContacts = [...contacts];    
        const index = contacts.findIndex((contact)=> contact.id === contactId);
        newContacts.splice(index, 1);
        setContacts(newContacts);
    }
  return (
    <div className="col-xl-9 col-lg-8 m-b30">
      <div className="job-bx table-job-bx browse-job clearfix">
        <div className="job-bx-title clearfix">
          <h5 className="font-weight-700 pull-left text-uppercase">Job Alerts</h5>
          <div className="float-right">
            <span className="select-title">Sort by freshness</span>
            <select className="custom-btn">
              <option>Last 2 Months</option>
              <option>Last Months</option>
              <option>Last Weeks</option>
              <option>Last 3 Days</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Premium jobs</th>
              <th>Criterias</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td className="job-name">
                  <Link href={"/job-detail"}>{contact.title}</Link>
                </td>
                <td className="criterias">Lorem Ipsum is simply dummy text.</td>
                <td className="date">{contact.date}</td>
                <td className="job-links">
                  <Link href={"#"} onClick={() => setCompany(true)}>
                    <i className="fa fa-eye"></i>
                  </Link>
                  <Link href={"#"} onClick={() => handleDeleteClick(contact.id)}>
                    <i className="ti-trash"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-bx float-right">
          <ul className="pagination">
            <li className="previous">
              <Link href={"#"}>
                <i className="ti-arrow-left"></i> Prev
              </Link>
            </li>
            <li className="active">
              <Link href={"#"}>1</Link>
            </li>
            <li>
              <Link href={"#"}>2</Link>
            </li>
            <li>
              <Link href={"#"}>3</Link>
            </li>
            <li className="next">
              <Link href={"#"}>
                Next <i className="ti-arrow-right"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* <Modal show={company} onHide={setCompany} className=" fade modal-bx-info">
        <div role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="logo-img">
                <img alt="" src={require("./../../images/logo/icon2.png")} />
              </div>
              <h5 className="modal-title">Company Name</h5>
              <button type="button" className="close" onClick={() => setCompany(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul>
                <li>
                  <strong>Job Title :</strong>
                  <p> Web Developer – PHP, HTML, CSS </p>
                </li>
                <li>
                  <strong>Experience :</strong>
                  <p>5 Year 3 Months</p>
                </li>
                <li>
                  <strong>Deseription :</strong>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry has been the industry's
                    standard dummy text ever since.
                  </p>
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setCompany(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal> */}
    </div>
  );
};

export default ApplicantJobAlert;
