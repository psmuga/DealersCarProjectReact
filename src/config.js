export default {
    apiUrl: process.env.NODE_ENV === 'production' ? 'https://domain.com/api' : 'http://localhost:9000/api',
}