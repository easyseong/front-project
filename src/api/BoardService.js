/*
    axios를 사용해서 api와 데이터 통신을 담당할 'Service' 를 구현
*/

import axios from 'axios';


const BASE_URL = "http://localhost:8080"; //api의 url을 정의

class BoardService {

    executeHelloService() {
        console.log("===executeHelloService===")
        return axios.get(BASE_URL+'/hello');
    }


    getBoards() { //목록데이터를 가져오는 함수
        return axios.get(BASE_URL);
    }

    validateDuplicated(email) { //{"email":"test@test"}
        console.log("===이메일중복확인===");
        return axios.post(BASE_URL +  "/sign/duplicated")
        
    }

    // registerComponent에서 사용하는 createUser함수 만들기
    createUser(user){
        return axios.post(BASE_URL + "/sign/register",user);
    }

    //로그인때 사용하는 함수
    executeJwtAuthenticationService(email, password) { 
        return axios.post(BASE_URL+'/sign/login', { //body에 username과 password넣고 post "/authenticate"
            email,
            password
        })
    }

    //로그인에 성공하면 
    registerSuccessfulLoginForJwt(username, token) { 
        console.log("===registerSuccessfulLoginForJwt===")
        localStorage.setItem('token', token); //토큰을 localstorage에 저장, 토큰 어디서 받아오나?
        localStorage.setItem('authenticatedUser', username); //username을 authenticatedUser로 localStorage에 저장
        // sessionStorage.setItem('authenticatedUser', username)
        //this.setupAxiosInterceptors(this.createJWTToken(token)) //토큰생성
        
        this.setupAxiosInterceptors();
    }


    setupAxiosInterceptors() {
        //요청인터셉터(요청가로채기)
        console.log("======setupAxiosInterceptors1======")
        axios.interceptors.request.use( 
            config => {
                const token = localStorage.getItem('token');
                console.log("======setupAxiosInterceptors2======"+token)
                if (token) { //토큰이 있다면
                    config.headers['X-AUTH-TOKEN'] = '' + token; 
                    console.log("X-AUTH-TOKEN===="+token);
                    //header에 Bearer+token담아서 보냄
                }
                // config.headers['Content-Type'] = 'application/json';
                return config;
            },
            error => {
                Promise.reject(error)
            });
    }


    logout() {
        //sessionStorage.removeItem('authenticatedUser');
        localStorage.removeItem("authenticatedUser");
        localStorage.removeItem("token");
    }

    isUserLoggedIn() {

        //let user = sessionStorage.getItem('authenticatedUser')
        const token = localStorage.getItem('token');
        console.log("===UserloggedInCheck==="+token);
        

        if (token) {
            return true;
        }
        //if(user===null) return false
        return false;
    }

}

export default new BoardService();
