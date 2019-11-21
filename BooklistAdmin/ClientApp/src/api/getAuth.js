const getAuth = async (userData) => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const requestData = await fetch(`./api/authentication/${userData}`, requestOptions)
    const response = await requestData.text();
    const data = JSON.parse(response);
    console.log(data)
    return data
}

export default getAuth;