const getBookList = async (id) => {
    const apiUrl = id ? `./api/booklists/${id}` : './api/booklists'


    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const requestData = await fetch(apiUrl, requestOptions)
    const response = await requestData.text()
    const data = JSON.parse(response)
    return data
}

export default getBookList
