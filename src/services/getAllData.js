function getAllData(url) {
  const response = fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
          .then(data => {
            if (data.info.next) {
              return getAllData(data.info.next).then(next => [...data.results, ...next])
            } else {
              return data.results
            }
          })
      } else {
        console.log('not ok')
      }
    })
    .catch(error => console.log(error))
  return response

}

export default getAllData;