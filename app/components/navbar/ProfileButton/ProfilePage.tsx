import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { username } = useParams();
  return (
    <div>
      <h1 className="text-4xl font-bold">{username}</h1>
    </div>
  );
}
