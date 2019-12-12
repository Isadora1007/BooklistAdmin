const getBookListLayouts = async (id) => {
    const apiUrl = id ? `./api/layouts/${id}` : './api/layouts'


    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const requestData = await fetch(apiUrl, requestOptions)
    const response = await requestData.text()
    const data = JSON.parse(response)
    return data
}

export default getBookListLayouts
