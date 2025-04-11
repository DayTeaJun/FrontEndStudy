import Person from "./Person";
export default function ChatPeopleList() {
  return (
    <div className="h-screen min-w-60 flex flex-col bg-gray-50">
      <Person
        index={0}
        isActive={true}
        name={"John Doe"}
        userId={"1234"}
        onlineAt={new Date().toISOString()}
        onChatScreen={false}
      ></Person>

      <Person
        index={0}
        isActive={false}
        name={"John Doe"}
        userId={"1234"}
        onlineAt={new Date().toISOString()}
        onChatScreen={false}
      ></Person>
    </div>
  );
}
