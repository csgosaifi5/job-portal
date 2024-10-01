import moment from "moment";



export default {
	async sendApiRequest(url:string, method:string, setauth:boolean, body:any) {
		
		const requestOptions:any = {
			method: method,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			credentials: "include",
			body: JSON.stringify(body),
			cache: "no-store",
		};
		if (method === "DELETE") {
			// delete requestOptions.body;
		}
		if (method === "GET") {
			delete requestOptions.body;
		}

		// if (setauth === true) {
		//   let token = localStorage.getItem("token")
		//     ? localStorage.getItem("token")
		//     : "no-token";
		//   requestOptions.headers["Authorization"] = "Bearer " + token;
		// }
		// if (setauth === true) {
		//   let token = window.user ? window.user.token : "no-token";
		//   requestOptions.headers["Authorization"] = "Bearer " + token;
		// }
		try {
			const response = await fetch(process.env.NEXT_PUBLIC_API_URL + url, requestOptions);
			let body = await response.text();
			if (response.status != 200) {
				throw body;
			}
			const data = body.includes("{") ? JSON.parse(body) : body;
			return data;
		} catch (e) {
			throw e;
		}
	},
	multiLineEditor: {
		plugins:
		  'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
		toolbar:
		  'undo redo | blocks fontsize | styleselect formatselect fontselect fontsizeselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | subscript superscript | link image media | charmap table | emoticons hr | print preview | code fullscreen',
		menubar: false,
	  },
	formatDate(date:string) {
		var d = new Date(date);
		var options:object = { month: "long", day: "numeric", year: "numeric" };
		return d.toLocaleDateString("en-US", options);
	},
	// async emailSend(params:any) {
	// 	try {
	// 		const info = await transporter.sendMail({
	// 		  from: params.from, // Sender address
	// 		  to: params.to, // List of receivers
	// 		  subject: params.subject, // Subject line
	// 		  text: params.text, // Plain text body
	// 		});
		
	// 		console.log('Message sent: %s', info.messageId);
	// 		return info.messageId;
	// 	  } catch (error) {
	// 		console.error('Error sending email:', error);
	// 		throw error;
	// 	  }
		
	// },
	// formatPhoneNumber(numbers) {
	// 	var format = "(xxx) xxx-xxxx";

	// 	for (var i = 0; i < numbers.length; i++) {
	// 		format = format.replace("x", numbers[i]);
	// 	}

	// 	return format;
	// },

	// getUserLocal() {
	// 	return JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : null;
	// },
	// prefixNumber(number) {
	// 	return number < 10 ? `0${number}` : number;
	// },
	// async dataUrlToFile(url, fileName) {
	// 	const [mediaType, data] = url.split(",");

	// 	const mime = mediaType.match(/:(.*?);/)?.[0];
	// 	const response = await fetch(url);
	// 	const buffer = await response.arrayBuffer();

	// 	return new File([buffer], fileName, { type: mime });
	// },

};
