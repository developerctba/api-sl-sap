const slOptions = {
    uri: '',
    body: {},
    json: true,
    insecure: true,
    secureProtocol: "TLSv1_method", // SSL
    rejectUnauthorized: false,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Prefer': 'odata.maxpagesize=20' // Result per page
    }
  };
  
  export default slOptions;
  