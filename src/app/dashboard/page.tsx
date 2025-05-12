import { getUsers } from "@/api/services/core/users/get/get-users";
import { GetUsersResponseTransformed } from "@/api/services/core/users/get/get-users.types";

// export const dynamic = "force-dynamic";
export const revalidate = 10;

export default async function Dashboard() {
  const response = await getUsers();
  const data: GetUsersResponseTransformed = response.data;

  return (
    <div>
      {data?.items.map((item, index) => <div key={index}>{item.username}</div>)}
    </div>
  );
}
