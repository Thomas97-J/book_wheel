interface Timestamp {
  nanoseconds: number;
  seconds: number;
}
interface UserData {
  id: string;
  nickname?: string;
  profileImage?: string;
  bio?: string;
}
interface FileObject extends Blob {
  name: string;
  lastModified: number;
  webkitRelativePath: string;
  size: number;
  type: string;
}

interface Post {
  id?: string;
  title: string;
  content: string;
  uid: string;
  createdAt?: Timestamp;
  updatadAt?: Timestamp;
  category?: string;
  postImage?: string;
  index?: number;
}

interface FollowData {
  uid: string;
  profileImage?: string;
  nickname: string;
  bio?: string;
}

interface Book {
  id?: string;
  index: number;
  areaNo: number;
  uid: string;
  title: string;
  author: string;
  genres?: string[];
  content: string;
  photoUrl?: string;
  createdAt: Timestamp;
  updatadAt?: Timestamp;
}
