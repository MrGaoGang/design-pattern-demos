interface WebListItem {
  userName: string;
  avatar: string;
  age: number;
  sex: "male" | "female";
}

interface ServerListItem {
  name: string;
  headerUrl: string;
  age: string;
  isMale: boolean;
}

function UserListAdapter(list: Array<ServerListItem>): WebListItem[] {
  // .... 可能还有很多复杂的处理
  return list.map(({ name, headerUrl, age, isMale }) => {
    return {
      userName: name,
      avatar: headerUrl,
      age: Number(age),
      sex: isMale ? "male" : "female",
    } as WebListItem;
  });
}

async function userListReqest() {
  return UserListAdapter(await fetch("/user/list"));
}
