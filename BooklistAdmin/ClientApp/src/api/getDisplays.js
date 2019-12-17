const getDisplays = async (id) => {
    const apiUrl = id ? `./api/displays/${id}` : './api/displays'
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const requestData = await fetch(apiUrl, requestOptions)
    const response = await requestData.text();
    const data = JSON.parse(response);
    return data
}

export default getDisplays;