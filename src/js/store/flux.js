const getState = ({ getStore, setStore }) => {
	return {
		store: {
			contactList: []
		},
		actions: {
			addContact: (fullname, email, phone, address) => {
				const url = "https://3000-cc2270b7-3663-47df-8934-859f16490208.ws-us0.gitpod.io/person";

				fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						fullname: fullname,
						email: email,
						phone: phone,
						address: address
					})
				});
			},

			getContact: () => {
				const store = getStore();

				const url = "https://3000-cc2270b7-3663-47df-8934-859f16490208.ws-us0.gitpod.io/person";

				// fetch the url and get the response back
				fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				})
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
						setStore({ contactList: data });
					})

					// If there was an error fetching the data, catch it here
					.catch(error => {
						console.log("Looks like there was a problem: \n", error);
					});
			}
		}
	};
};

export default getState;
