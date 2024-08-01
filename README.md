# 지역 도서 교환 플랫폼 - 책바퀴

배포 url : https://book-wheel.vercel.app/

## 프로젝트 소개
![KakaoTalk_20240801_110831971](https://github.com/user-attachments/assets/de0a29c4-5478-4dea-9717-42cf7cf183de)

책바퀴는 책장 한켠에 잠들어 있는 도서를 위한 모바일 교환 커뮤니티입니다.
책바퀴는 실시간 채팅, 간편한 도서 교환을 위한 거래 페이지, 게시판, 도서 정보 페이지 등 자신의 도서와 그에 따른 이야기를 나눌 수 있는 다양한 수단을 제공합니다.

## 0. 시작하기

1. 레포지토리 복제 및 의존성 설치

```
$ git clone https://github.com/Thomas97-J/book_wheel.git
$ cd book_wheel
$ yarn install
```

2. 개발 서버 가동

```
$ yarn dev
```

3. 브라우저 실행

```
http://localhost:5173/
```

## 1. 기술 스택

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

<img src="https://img.shields.io/badge/Zustand-1E4CC9?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">

<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=netlify&logoColor=white">

## 2. 개발 기간

2024년 6월 ~ 7월 (4주)

## 3. 주요 기능
1. 도서 등록 및 관리

   | 도서 등록 | 도서 관리 |
   | --- | --- |
   | <p align="center"><img src="https://github.com/user-attachments/assets/949da22c-af4d-47e8-afce-b3941759a8a9" width="300px"></p> | <p align="center"><img src="https://github.com/user-attachments/assets/af0fbb30-ddab-4ac7-be4f-5b9359cfaf97" width="300px"></p> |
   
2. 도서 교환
   
   | 도서 검색 페이지를 통한 도서 접근 | 사용자 프로필을 통한 도서 접근 |
   | --- | --- |
   | <p align="center"><img src="https://github.com/user-attachments/assets/318a9e69-f6b1-44db-b749-ecd7014b209b" width="300px"></p> | <p align="center"><img src="https://github.com/user-attachments/assets/aa4d5144-22cf-452c-ad31-6ddb7136748f" width="300px"></p> |
   
   | 도서 교환 신청 | 신청 내역 확인 및 수락 (교환 상대 화면) |
   | --- | --- |
   | <p align="center"><img src="https://github.com/user-attachments/assets/2b2c45c4-a133-4fa4-955a-eb45e332e9b3" width="300px"></p> | <p align="center"><img src="https://github.com/user-attachments/assets/d2857a7a-0c08-4136-9e4d-9377ec27bbd8" width="300px"></p> |
   
   | 수락 내역 확인 | 교환 완료 처리 (교환 상대 화면) |
   | --- | --- |
   | <p align="center"><img src="https://github.com/user-attachments/assets/58f42742-b4a9-4f3e-8501-fc0f2c8056ff" width="300px"></p> | <p align="center"><img src="https://github.com/user-attachments/assets/8a1fc7ae-32a5-4d17-b20e-62ff46a3986b" width="300px"></p> |

## 4. 페이지별 기능

1. 홈

   - 지역 커뮤니티 페이지

   - 게시글 목록

     - 드롭다운을 통해 게시글 분류를 변경할 수 있습니다.
     - 인피니티 스크롤을 통한 페이지네이션으로 한번에 10개의 게시글을 받아옵니다.

   - 게시글 상세

     - 게시글 작성자에 대한 프로필이 노출됩니다.
     - 게시글에 대한 조회수가 기록됩니다.
     - 게시글에 대한 좋아요를 누를 수 있습니다. 좋아요를 누른 게시글은 마이페이지 관심 글 목록에 추가됩니다.
     - 자신이 작성한 게시글을 수정하거나 삭제할 수 있습니다.

     - 댓글을 작성할 수 있습니다.
     - 댓글은 인피니티 스크롤을 통한 페이지네이션으로 20개 씩 불러와집니다. 댓글은 최신 순으로 정렬됩니다.
     - 자신이 작성한 댓글을 삭제할 수 있습니다. 댓글이 삭제되면 답글 역시 삭제됩니다.
     - 댓글에 대한 좋아요를 누를 수 있습니다.
     - 댓글 유저 이름을 누를 시 프로필로 이동합니다.
     - 댓글에 대한 답글을 작성할 수 있습니다.
     - 답글 유저 이름을 누를 시 프로필로 이동합니다.
     - 자신이 작성한 답글을 삭제 할 수 있습니다.

   - 게시글 작성
     - 이미지를 한장 업로드 할 수 있습니다. 업로드한 이미지는 삭제하거나 수정할 수 있습니다.
     - 제목은 필수적으로 요청됩니다.
     - 게시글의 카테고리를 정할 수 있습니다. 기본 카테고리는 전체로 설정됩니다.

2. 롤링

   - 다른 사용자가 공개한 도서 목록을 순회하는 페이지
   - 인피니티 스크롤을 통한 페이지네이션으로 한번에 3개씩의 도서가 받아와집니다.
   - 3개의 도서 중 가운데 도서가 화면에 노출되면 다음 도서 목록을 가져옵니다.
   - 도서에 좋아요를 누를 수 있습니다.
   - 도서를 클릭할 시 해당 도서 상세 페이지로 이동합니다.

3. 교환

   - 도서 교환 현황을 볼 수 있는 페이지
   - 받은 거래 / 보낸 거래
     - 자신이 받은 거래 신청, 자신이 보낸 거래 신청이 노출됩니다.
     - 해당 신청 카드를 누르면 교환 상세 페이지로 이동합니다.
   - 교환 상세
     - 도서 교환의 진행 상황을 확인할 수 있습니다.
     - 교환 신청한 상대의 프로필을 확인할 수 있습니다.
     - 교환이 신청된 자신의 도서를 확인할 수 있습니다.
     - 교환 신청한 상대의 도서 목록을 페이징을 통한 페이지네이션으로 확인 할 수 있습니다.
     - 상대 도서 목록 중 원하는 도서를 선택 할 수 있습니다. 원하는 도서를 선택한 후 교환을 수락하면 상대에게 교환 수락 메시지가 전송됩니다.
     - 진행중인 교환을 취소하거나, 완료 처리할 수 있습니다.

4. 메시지

   - 실시간 사용자 채팅 페이지
     - 파이어베이스의 실시간 데이터베이스로 유저간 실시간 채팅을 진행합니다.
   - 메시지 목록
   - 메시지 상세

5. 마이

   - 사용자 정보 페이지
   - 프로필 수정
   - 비밀번호 변경
   - 프로필
     - 팔로워, 팔로잉
     - 작성 글
   - 관심 글
   - 관심 도서

6. 내 책장

   - 도서 목록
   - 도서 상세
     - 도서 교환을 신청할 수 있습니다.

7. 검색
   - 사용자 검색
   - 게시글 검색(미구현)
   - 도서 검색

## 5. 트러블 슈팅

1. [Fixed Input 가상 키보드 스크롤 이슈](https://velog.io/@alstn6987/Fixed-Input-%EA%B0%80%EC%83%81-%ED%82%A4%EB%B3%B4%EB%93%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EC%9D%B4%EC%8A%88)

2. [API 응답 속도 개선 1부 - 요청 횟수 줄이기](https://velog.io/@alstn6987/API-%EC%9D%91%EB%8B%B5-%EC%86%8D%EB%8F%84-%EA%B0%9C%EC%84%A0-1%EB%B6%80)

3. [API 응답 속도 개선 2부 - 근본적인 문제 살피기](https://velog.io/@alstn6987/API-%EC%9D%91%EB%8B%B5-%EC%86%8D%EB%8F%84-%EA%B0%9C%EC%84%A0-2%EB%B6%80-%EA%B7%BC%EB%B3%B8%EC%A0%81%EC%9D%B8-%EB%AC%B8%EC%A0%9C-%EC%82%B4%ED%94%BC%EA%B8%B0)

## 6. 기술적 의사 결정

1. [프론트 개발자의 쿼리 고민](https://velog.io/@alstn6987/%ED%94%84%EB%A1%A0%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98-%EC%BF%BC%EB%A6%AC-%EA%B3%A0%EB%AF%BC)

2. [Zustand vs 세션스토리지, 페이지 위치 저장.](https://velog.io/@alstn6987/Zustand-vs-%EC%84%B8%EC%85%98%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80.-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9C%84%EC%B9%98-%EC%A0%80%EC%9E%A5)
## 7. 프로젝트 구조

```
┣ 📁public
┣ 📁src
  ┣ 📁api
      ┣ 📁auth
      ┣ 📁book
      ┣ 📁comments
      ┣ 📁deal
      ┣ 📁firestore
      ┣ 📁follow
      ┣ 📁like
      ┣ 📁message
      ┣ 📁posts
      ┣ 📁users
  ┣ 📁assets
      ┣ 📁fonts
      ┣ 📁images
      ┣ 📁styles
  ┣ 📁components
      ┣ 📁common
      ┣ 📁desktop
      ┣ 📁mobile
  ┣ 📁context
  ┣ 📁HOCs
  ┣ 📁hooks
      ┣ 📁auth
      ┣ 📁book
      ┣ 📁comments
      ┣ 📁common
      ┣ 📁deal
      ┣ 📁firestore
      ┣ 📁follow
      ┣ 📁like
      ┣ 📁message
      ┣ 📁posts
      ┣ 📁users
  ┣ 📁pages
  ┣ 📁store
  ┣ 📁type
  ┣ 📁utils
  ┣ App.tsx
  ┣ firebase.ts
  ┣ main.tsx
  ┣ vite-env.d.ts
```

## 8. 아키텍쳐
<img src="https://github.com/user-attachments/assets/8dc351e7-c2ea-4dbc-8404-8c9cfe046190">

