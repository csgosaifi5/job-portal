import Link from "next/link";

const CompanyTransactions = () => {
  return (
    <>
      <div className="col-xl-9 col-lg-8 m-b30">
        <div className="job-bx table-job-bx clearfix">
          <div className="job-bx-title clearfix">
            <h5 className="font-weight-700 pull-left text-uppercase">Transaction History</h5>
            <Link href={"/company-post-jobs"} className="site-button right-arrow button-sm float-right">
              Back
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="order-id text-primary">#123</td>
                <td className="job-name">
                  <Link href={""}>Social Media Expert</Link>
                </td>
                <td className="amount text-primary">$99.00</td>
                <td className="date">Dec 15,2018</td>
                <td className="transfer">Paypal</td>
                <td className="expired pending">Pending </td>
              </tr>
              <tr>
                <td className="order-id text-primary">#456</td>
                <td className="job-name">
                  <Link href={"#"}>Web Designer</Link>
                </td>
                <td className="amount text-primary">$199.00</td>
                <td className="date">Nov 10,2018</td>
                <td className="transfer">Bank Transfer</td>
                <td className="expired pending">Pending</td>
              </tr>
              <tr>
                <td className="order-id text-primary">#789</td>
                <td className="job-name">
                  <Link href={"#"}>Finance Accountant</Link>
                </td>
                <td className="amount text-primary">$299.00</td>
                <td className="date">Oct 5,2018</td>
                <td className="transfer">Paypal</td>
                <td className="expired pending">Pending </td>
              </tr>
              <tr>
                <td className="order-id text-primary">#101</td>
                <td className="job-name">
                  <Link href={"#"}>Social Media Expert</Link>
                </td>
                <td className="amount text-primary">$399.00</td>
                <td className="date">Dec 15,2018</td>
                <td className="transfer">Bank Transfer</td>
                <td className="expired success">Successfull </td>
              </tr>
              <tr>
                <td className="order-id text-primary">#112</td>
                <td className="job-name">
                  <Link href={"#"}>Web Designer</Link>
                </td>
                <td className="amount text-primary">$499.00</td>
                <td className="date">Nov 10,2018</td>
                <td className="transfer">Paypal</td>
                <td className="expired pending">Pending </td>
              </tr>
              <tr>
                <td className="order-id text-primary">#987</td>
                <td className="job-name">
                  <Link href={"#"}>Finance Accountant</Link>
                </td>
                <td className="amount text-primary">$599.00</td>
                <td className="date">Oct 5,2018</td>
                <td className="transfer">Bank Transfer</td>
                <td className="expired success">Successfull </td>
              </tr>
              <tr>
                <td className="order-id text-primary">#654</td>
                <td className="job-name">
                  <Link href={"#"}>Social Media Expert</Link>
                </td>
                <td className="amount text-primary">$699.00</td>
                <td className="date">Dec 15,2018</td>
                <td className="transfer">Paypal</td>
                <td className="expired success">Successfull </td>
              </tr>
              <tr>
                <td className="order-id text-primary">#321</td>
                <td className="job-name">
                  <Link href={"#"}>Web Designer</Link>
                </td>
                <td className="amount text-primary">$799.00</td>
                <td className="date">Nov 10,2018</td>
                <td className="transfer">Bank Transfer</td>
                <td className="expired success">Successfull </td>
              </tr>
              <tr>
                <td className="order-id text-primary">#569</td>
                <td className="job-name">
                  <Link href={"#"}>Finance Accountant</Link>
                </td>
                <td className="amount text-primary">$899.00</td>
                <td className="date">Oct 5,2018</td>
                <td className="transfer">Paypal</td>
                <td className="expired pending">Pending </td>
              </tr>
              <tr>
                <td className="order-id text-primary">#563</td>
                <td className="job-name">
                  <Link href={"#"}>Web Designer</Link>
                </td>
                <td className="amount text-primary">$999.00</td>
                <td className="date">Nov 10,2018</td>
                <td className="transfer">Bank Transfer</td>
                <td className="expired success">Successfull </td>
              </tr>
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
      </div>
    </>
  );
};

export default CompanyTransactions;
