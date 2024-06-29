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
  createdAt?: Date;
  updatadAt?: Date;
  category?: string;
  index?: number;
}
interface FollowData {
  uid: string;
  profileImage?: string;
  nickname: string;
  bio?: string;
}
