# 지역 도서 교환 플랫폼 - 책바퀴

배포 url : https://book-wheel.vercel.app/

## 프로젝트 소개

책바퀴는 독서가들을 위한 지역 커뮤니티 & 도서 교환 플랫폼입니다.

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

   1. 도서 등록
      <img src="https://velog.velcdn.com/images/alstn6987/post/0275f85d-1801-4a94-9ffb-77f417124e80/image.gif" width="400">

   2. 도서 관리
      <img src="https://velog.velcdn.com/images/alstn6987/post/82577bb1-68d8-4e26-b71b-f7bc521e36ff/image.gif" width="400">

2. 도서 교환

   1. 도서 검색
   2. 사용자 프로필을 통한 도서 목록
   3. 도서 교환 신청
   4. 신청 내역 확인
   5. 도서 교환 수락
   6. 수락 내역 확인

## 4. 페이지별 기능

1. 홈

   - 지역 커뮤니티 페이지
   - 게시글 목록
   - 게시글 상세

2. 롤링

   - 다른 사용자가 공개한 도서 목록을 순회하는 페이지

3. 교환

   - 도서 교환 현황을 볼 수 있는 페이지
   - 받은 거래 / 보낸 거래
   - 교환 상세

4. 메시지

   - 실시간 사용자 채팅 페이지
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

7. 검색
   - 사용자 검색
   - 게시글 검색(미구현)
   - 도서 검색

## 5. 프로젝트 구조

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

## 6. 트러블 슈팅

1. 쿼리 개선
