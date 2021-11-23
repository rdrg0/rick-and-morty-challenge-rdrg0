import { range } from "utils/utils"

function getAllData(url) {
  const response = fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
          .then(data => {
            if (data.info) {
              return getAllData(url + range(data.info.count, 1).join(',')).then(data => data)
            } else {
              return data
            }
          })
      } else {
        console.log('not ok')
      }
    })

  return response

}

export default getAllData;



