import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export default class AddContact extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			status: null
		};
	}

	render() {
		return (
			<div className="container">
				<div>
					<h1 className="text-center mt-5">Add a new contact</h1>
					<form>
						<div className="form-group">
							<label>Full Name</label>
							<input name="fullname" type="text" className="form-control" placeholder="Full Name" />
						</div>
						<div className="form-group">
							<label>Email</label>
							<input name="email" type="email" className="form-control" placeholder="Enter email" />
						</div>
						<div className="form-group">
							<label>Phone</label>
							<input name="phone" type="phone" className="form-control" placeholder="Enter phone" />
						</div>
						<div className="form-group">
							<label>Address</label>
							<input name="address" type="text" className="form-control" placeholder="Enter address" />
						</div>
						<Context.Consumer>
							{({ store, actions }) => {
								return (
									<div>
										<button
											type="button"
											className="btn btn-primary form-control"
											onClick={() => {
												let fullname = document.querySelector("[name=fullname]").value.trim();
												let email = document.querySelector("[name=email]").value.trim();
												let phone = document.querySelector("[name=phone]").value.trim();
												let address = document.querySelector("[name=address]").value.trim();
												if (phone === "") phone = null;
												if (address === "") address = null;
												actions.addContact(fullname, email, phone, address);
												this.setState({ status: "Contact Sent" });
												document.querySelector("form").reset();
											}}>
											POST
										</button>
										<button
											type="button"
											className="btn btn-secondary form-control"
											onClick={() => {
												actions.getContact();
											}}>
											GET
										</button>
									</div>
								);
							}}
						</Context.Consumer>
						<Link className="mt-3 w-100 text-center" to="/">
							or get back to contacts
						</Link>
					</form>
					{!this.state.status ? (
						""
					) : (
						<div className="alert alert-success pt-3" role="alert">
							{this.state.status}
						</div>
					)}
				</div>
			</div>
		);
	}
}
