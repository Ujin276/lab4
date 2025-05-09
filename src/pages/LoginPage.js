import { useState } from 'react';

export default function LoginPage({ navigateTo }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = () => {
    if (!email || !password) {
      alert('Имэйл болон нууц үгээ оруулна уу.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Имэйл буруу байна.');
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Индексийг олно
    const userIndex = allUsers.findIndex(
      (user) => user.email === email && user.password === password
    );

    if (userIndex !== -1) {
      const matchedUser = allUsers[userIndex];

      // Нэвтэрсэн хэрэглэгчийг индексийн хамт хадгална
      localStorage.setItem(
        'loggedInUser',
        JSON.stringify({ ...matchedUser, index: userIndex })
      );

      setError('');
      alert('Амжилттай нэвтэрлээ!');
      navigateTo('AfterLogin');
    } else {
      setError('Имэйл эсвэл нууц үг буруу байна.');
    }
  };

  return (
    <div className="w-full max-w-md border border-gray-300 rounded">
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-medium">Нэвтрэх</h2>
          <button
            onClick={() => navigateTo('home')}
            className="text-blue-600 hover:underline"
          >
            Буцах
          </button>
        </div>

        {error && <div className="text-red-500 mb-2">{error}</div>}

        <form className="space-y-4">
          <div>
            <label className="block mb-1">Имэйл</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">Нууц үг</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-blue-500 text-white rounded px-4 py-2 w-full"
          >
            Нэвтрэх
          </button>
        </form>
      </div>
    </div>
  );
}
