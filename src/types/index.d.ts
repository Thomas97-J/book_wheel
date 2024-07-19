interface Timestamp {
  nanoseconds: number;
  seconds: number;
}
interface UserData {
  uid?: string;
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
  viewCount: number;
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
  category: string;
  publisher: string;
  genres?: string[];
  content: string;
  isPublic?: boolean;
  photoUrl?: string;
  createdAt: Timestamp;
  updatadAt?: Timestamp;
}

interface Message {
  id?: string;
  chatId: string;
  uid: string;
  userName: string;
  text: string;
  createdAt?: Timestamp;
  isDealMessage?: boolean;
  dealId?: string;
}

interface Deal {
  id?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  from_uid: string;
  from_nickname: string;
  to_uid: string;
  to_nickname: string;
  book_id?: string;
  book_index: number;
  book_name: string;
  state: "await" | "reject" | "accept" | "finished";
  selected_book_indexes: number[];
}
