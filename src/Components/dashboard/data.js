import axiosClient from '../../axios'

function data() {
    axiosClient.get('/dashboardData').then((response) => {
        return response.data
    }).catch((error) => { 
        return error.response.data
    })
}

export default data