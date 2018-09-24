import React from 'react';
import Pagination from './../Pagination';
import { Link } from "react-router-dom";

class Invoice extends React.Component {

    constructor(props) {

        super(props);
        console.log(props);
        console.log("Invoice Id : " + props.match.params.id)

        var invoice;
        var invoice_number = props.match.params.id;

        this.state = {
            invoice: invoice,
            invoice_number: invoice_number,
            pageOfItems: []
        };

        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentDidMount() {

          const { history } = this.props;

          var xhr = new XMLHttpRequest();
          xhr.withCredentials = false;

          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              console.log(this.responseText);
              // this.setState({ invoice: this.responseText });
              let jsonObject = JSON.parse(this.responseText);
              console.log("Invoice Id >>> " + jsonObject.id);
              window.sessionStorage.setItem('invoice', jsonObject);
            }
          });

          xhr.open("GET", 'http://localhost:8098/invoice/' + this.state.invoice_number);
          xhr.setRequestHeader("content-type", "application/json");
          xhr.send();
    }

    onChangePage(pageOfItems, invoice) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems, invoice: invoice });
    }

    render() {

      // let my_invoice =  window.sessionStorage.getItem('invoice');
      // console.log(my_invoice[1].id);
      // console.log("object is: %O", my_invoice['id']);'
      const { invoice } = this.state;

        return (
            <div>

            <h4 class="ui large header">Invoice : {this.state.invoice_number}  </h4>
            <hr/>
            <br/>

                <div>
                    Invoice Id : { invoice }
                </div>

                <hr />
            </div>
        );
    }
}

export default Invoice;


// Read :
// https://www.youtube.com/watch?v=XRfD8xIOroA
