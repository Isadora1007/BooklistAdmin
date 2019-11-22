const getBookList = async () => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const requestData = await fetch(`./api/booklists`, requestOptions)
    const response = await requestData.text();
    const data = JSON.parse(response);
    return data
}

export default getBookList;