const editBookList = async (id, fromData) => {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: fromData,
        redirect: 'follow'
    };

    const requestData = await fetch(`./api/booklists/${id}`, requestOptions)
    const response = await requestData.text()
    return response
}

export default editBookList