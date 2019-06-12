import PropTypes from "prop-types";
import { Redirect } from "react-router";
import React from "react";

const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contactList: []
		},
		actions: {
			addContact: (fullname, email, phone, address, gender) => {
				const url = "https://3000-cc2270b7-3663-47df-8934-859f16490208.ws-us0.gitpod.io/person";

				// Get a random picture for the user depending if they are Female or Male
				let g = gender === "M" ? "m" : "w";
				let num = "" + Math.floor(Math.random() * 11);
				if (num.length === 1) num = "0" + num;
				let image_url = `http://demos.themes.guide/bodeo/assets/images/users/${g}1${num}.jpg`;

				fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						fullname: fullname,
						email: email,
						phone: phone,
						address: address,
						gender: gender,
						image_url: image_url
					})
				}).then(() => {
					fetch(url)
						.then(response => response.json())
						.then(updatedData => {
							setStore({ contactList: updatedData });
						});
				});
			},

			updateContact: (id, fullname, email, phone, address) => {
				const url = "https://3000-cc2270b7-3663-47df-8934-859f16490208.ws-us0.gitpod.io/person/";

				fetch(url + id, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: {
						fullname: fullname,
						email: email,
						phone: phone,
						address: address
					}
				}).then(() => {
					fetch(url)
						.then(response => response.json())
						.then(updatedData => {
							setStore({ contactList: updatedData });
						});
				});
			},

			deleteContact: id => {
				const store = getStore();
				const url = "https://3000-cc2270b7-3663-47df-8934-859f16490208.ws-us0.gitpod.io/person/";

				fetch(url + id, {
					method: "DELETE"
				}).then(() => {
					fetch(url)
						// first must check if the fetch was able to reach the data successfully..
						// if it was, turn it into JSON
						.then(response => {
							// one of the response properties that renders true if successful
							if (response.status >= 400 && response.status !== 404) {
								throw Error(Response.status + ": " + Response.statusText);
							}
							return response.json();
						})

						// use the fetched data that's in JSON format
						.then(data => {
							this.setState({ music: data });

							console.log(data);
						})

						// If there was an error fetching the data, catch it here
						.catch(error => {
							console.log("Looks like there was a problem: \n", error);
						});
				});
			}
		}
	};
};

getState.propTypes = {
	history: PropTypes.object
};

export default getState;
