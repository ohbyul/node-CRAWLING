const axios = require("axios");     //특정 URL의 HTML을 가져온다. 
const cheerio = require("cheerio");     //가져온 HTML의 구조를 parse 해준다. 마치 제이쿼리를 사용하는 것처럼

const getHTML = async(keyword) => { //async 방식으로 keyword 파라미터를 던진다.
    try{
        return await axios.get("https://www.inflearn.com/courses?s="+encodeURI(keyword))
    }catch(err){
        console.log(err);
    }
}

const parsing = async (keyword) => {
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);  //제이쿼리 형식으로 데이터를 파싱
    const $courseList = $(".course_card_item");

    let courses = [];
    $courseList.each((idx, node) => { //가지고온 아이템의 내장함수 each 는 for문 돌리는 것과 같은거라 볼수 있다. 
        const title = $(node).find(".course_title:eq(0)").text();
        courses.push({
            title : $(node).find(".course_title").text(),
            instructor : $(node).find(".instructor").text(),
            price : $(node).find(".price").text(),
            rating : $(node).find(".star_solid").css("width"),
            img : $(node).find(".card-image > figure > img").attr("src")
        })
    });
    console.log(courses);
}

parsing("자바스크립트");

/*
공부 출처 - 유투브 개발자의품격
링크 : https://www.youtube.com/watch?v=xbehh8lWy_A&list=PLqbWuGdVBJd0oHdwp9y9NsTTQbUuEPNyY&index=8
Node.js 크롤링 - 인프런 사이트 크롤링하기
크롤링 : 특정 페이지를 분석해서 원하는 데이터를 가져온다.
npm init -y 
 : package.json 을 만든다.
npm install axios cheerio
 : 두가지 모듈 설치
axios -> 특정 url 에 html 구조를 가져온다
cheerio -> html 구조를 파싱 해준다.
 */