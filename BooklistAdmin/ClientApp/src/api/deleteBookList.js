const deleteBookList = async (id) => {

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    const requestData = await fetch(`./api/booklists/${id}`, requestOptions)
    return requestData
}

export default deleteBookList