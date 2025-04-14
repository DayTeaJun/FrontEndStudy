"use server";

import {
  createServerSupabaseAdminClient,
  createServerSupabaseClient,
} from "@/utils/supabase/server";

export async function getAllUser() {
  // admin api 접근해서 모든 유저들의 정보를 가져옴
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data.users;
}

// 특정 유저를 가져오는 함수
export async function getUserById(userId: string) {
  const supabase = await createServerSupabaseAdminClient();

  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error) {
    console.error("Error fetching users:", error);
    return null;
  }

  return data.user;
}

export async function sendMessage({
  message,
  chatUserId, // 상대방 id
}) {
  const supabase = await createServerSupabaseClient(); // admin은 현재 로그인한 유저를 알 수 없어서 serverSupabaseClient를 사용해야 함

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) {
    throw new Error("User not authenticated");
  }

  const { data, error: sendMessageError } = await supabase
    .from("message")
    .insert({
      message,
      receiver: chatUserId, // 상대방 id
      sender: session.user.id, // 현재 로그인한 유저의 id
    });

  if (sendMessageError) {
    throw new Error(sendMessageError.message);
  }

  return data;
}

export async function getAllMessages({ chatUserId }) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) {
    throw new Error("User not authenticated");
  }

  const { data, error: getAllMessagesError } = await supabase
    .from("message")
    .select("*")
    // 메시지 수신자가 나 또는 상대방인 모든 메세지
    // .or(`receiver.eq.${chatUserId},receiver.eq.${session.user.id}`)
    // 메시지 발신자가 나 또는 상대방인 모든 메세지
    // .or(`sender.eq.${chatUserId},sender.eq.${session.user.id}`)
    // 즉, 상대방과 나의 모든 메세지

    // -> 강의에서는 위처럼 or를 사용했지만, 이렇게하면 다른 유저의 메시지가 섞여서 나올 가능성이 있음, supabase의 or 같은 메서드는 조건들을 나열하여 하나의 where절을 만들어줌
    // 즉, 아래와 같은 쿼리문을 만들어줌
    // SELECT * FROM message
    // WHERE
    //   receiver = A OR receiver = B OR sender = A OR sender = B
    // -> 그래서 아래와 같이 수정한다. 내부에 and를 사용하여 상대방이 발신자고 내가 수신자거나, 내가 발신자고 상대방이 수신자일 때를 조건으로 넣어준다.
    .or(
      `and(sender.eq.${session.user.id},receiver.eq.${chatUserId}),and(sender.eq.${chatUserId},receiver.eq.${session.user.id})`
    )

    // 오름차순, 오래된 시간 -> 최근 시간 순으로 정렬
    .order("created_at", { ascending: true });

  if (getAllMessagesError) {
    return [];
  }

  return data;
}
