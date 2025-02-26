import Link from "next/link";

export default function Home() {
  return (
    <><Link href={"/login"}>로그인하러가기</Link><br /><Link href={"/join"}>회원가입 하러가기</Link></>
  );
}
