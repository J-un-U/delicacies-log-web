// pages/join.tsx
"use client";
import { useState, ChangeEvent, FormEvent, JSX } from 'react';

interface FormState {
  userId: string;
  password: string;
  userNm: string;
  email: string;
}

export default function Signup(): JSX.Element {
  const [form, setForm] = useState<FormState>({
    userId: '',
    password: '',
    userNm: '',
    email: '',
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/user/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setMessage('회원가입에 실패했습니다.');
        return;
      }

      const data: string = await res.text(); // 백엔드가 문자열 메시지를 응답한다고 가정
      setMessage(data);
    } catch (error) {
      console.error(error);
      setMessage('오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="userId">아이디: </label>
          <input
            id="userId"
            type="text"
            name="userId"
            value={form.userId}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">비밀번호: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="userNm">이름: </label>
          <input
            id="userNm"
            type="text"
            name="userNm"
            value={form.userNm}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">이메일: </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
