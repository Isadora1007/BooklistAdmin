const deleteBookList = async (id) => {

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    const requestData = await fetch(`./api/booklists/${id}`, requestOptions)
    const response = await requestData.text()
    return response
}

export default deleteBookList