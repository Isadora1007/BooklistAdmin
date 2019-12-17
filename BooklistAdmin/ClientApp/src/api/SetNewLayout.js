const SetNewLayout= async (formData) => {
    let myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(formData),
        redirect: 'follow',
    };

    const sendData = await fetch('./api/booklists', requestOptions)
    const response = await sendData.text()
    const result = JSON.parse(response)
    return result
}

export default SetNewLayout