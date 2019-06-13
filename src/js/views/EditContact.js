import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import PropTypes from "prop-types";

export default class EditContact extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			status: null
		};
	}

	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					let paramID = this.props.match.params.theid;
					let contact = store.contactList.filter(item => item.email === paramID);
					contact = contact[0];
					return (
						<div className="container">
							<div>
								<h1 className="text-center mt-5">Add a new contact</h1>
								<form>
									<div className="form-group">
										<label>Full Name</label>
										<input
											name="fullname"
											type="text"
											className="form-control"
											placeholder="Full Name"
											defaultValue={contact && contact.fullname}
										/>
									</div>
									<div className="form-group">
										<label>Email</label>
										<input
											name="email"
											type="email"
											className="form-control"
											placeholder="Enter email"
											defaultValue={contact && contact.email}
										/>
									</div>
									<div className="form-group">
										<label>Phone</label>
										<input
											name="phone"
											type="phone"
											className="form-control"
											placeholder="Enter phone"
											defaultValue={contact && contact.phone}
										/>
									</div>
									<div className="form-group">
										<label>Address</label>
										<input
											name="address"
											type="text"
											className="form-control"
											placeholder="Enter address"
											defaultValue={contact && contact.address}
										/>
									</div>
									<div className="form-group">
										<label className="pr-2">Gender</label>
										<select name="gender" defaultValue={contact && contact.gender}>
											<option value={contact && contact.gender}>
												{contact && contact.gender}
											</option>
										</select>
									</div>

									<Link to="/">
										<button
											type="button"
											className="btn btn-primary form-control"
											onClick={() => {
												let fullname = document.querySelector("[name=fullname]").value.trim();
												let email = document.querySelector("[name=email]").value.trim();
												let phone = document.querySelector("[name=phone]").value.trim();
												let address = document.querySelector("[name=address]").value.trim();
												actions.updateContact(
													contact.id,
													fullname,
													email,
													phone,
													address,
													this.props
												);
												this.setState({ status: "Contact Sent" });
												document.querySelector("form").reset();
											}}>
											UPDATE
										</button>
									</Link>

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
				}}
			</Context.Consumer>
		);
	}
}

EditContact.propTypes = {
	match: PropTypes.object
};
