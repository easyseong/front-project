import axios from 'axios'

class HelloWorldService {
    executeHelloService() { //api 데이터를 가져오는 함수
        console.log('executed service')
        return axios.get('http://localhost:8090/hello');       //springboot api의 url을 정의 
    }
}

export default new HelloWorldService()