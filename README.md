### REACT

**`Login.js`**

1. 사용자가 로그인 버튼을 클릭한다.
2. `http://localhost:8080/oauth/kakao` 로 리디렉트

**`KakaoRedirectPage.js`**

1. Auth code 를 받기위한 페이지로 redirect 된 유저는 auth code 를 받음
   ```
   const searchParams = new *URLSearchParams*(location.search);
   const code = searchParams.get('code');
   ```
   
3. 받은 code 를 axios.get 으로
`http://localhost:8080/oauth/login/kakao?code=${code}` 백앤드에 전달
4. `KakaoRedirectPage.js` 에서 blogName 이 null 값이라면 최초회원이라 생각하여 `/signin1` 으로 리디렉트 하여 추가정보를 받고,
    - [ ]  null 값이 아니라면 `/` 로 이동.. 이동하고 기존 회원이라는 것을 알려주어야 한다.
    또한 받은 data 들을 넘겨주어야 한다? 아니면 db에서 받아오거나!

**`SignIn-1.js`**

1. 사용자에게 BlogName, BlogAddress, Nickname 을 받아서 백앤드에 전달
2. 전달에 성공하면 `/signin2` 로 email, blogAddress데이터와 함께  리디렉트

**`SignIn-2.js`**

1. 사용자의 이메일과 blogAddress 를 보여주고
2. odo 둘러보기 버튼을 눌러 메인페이지로 넘어갈 때 최조회원이 아님을 알려줌

**`MainPage.js`**

1. `Header.js` 컴포넌트에 프로필 바꿔야되~ 알려주고

**`Header.js`**

1. 
    - [ ]  DB에서 가져온 회원의 정보를 보여줌


[[Spring] 쉬운 확장이 가능한 OAuth2.0 로그인 구현(카카오, 네이버, 구글 등) (Security 사용 X)](https://ttl-blog.tistory.com/1434)
