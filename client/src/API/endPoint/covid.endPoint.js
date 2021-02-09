import axios from 'axios'

const axiosIns1 = axios.create({
    baseURL:'https://covid-19-data.p.rapidapi.com/totals',
    method:'GET',
    headers:{
    'x-rapidapi-key': '0ee20b7665mshd2ac59967cdb552p198e9fjsndfeaed213d3c',
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
    }
})

export default axiosIns1