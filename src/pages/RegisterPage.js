import { useState } from 'react';

export default function RegisterPage({ navigateTo }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageURL, setImageURL] = useState('');
  

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidURL = (url) =>
    /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i.test(url);

  const handleRegister = () => {
    if (!name || !email || !password || !imageURL) {
      alert('Бүх талбарыг бөглөнө үү.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Имэйл буруу байна. Зөв имэйл хаяг оруулна уу.');
      return;
    }

    if (!isValidURL(imageURL)) {
      alert('Зургийн URL буруу байна. Жишээ нь: https://example.com/image.jpg');
      return;
    }

    const newUser = {
      name,
      email,
      password,
      imageURL,
    };

    
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    
    const emailExists = existingUsers.some((user) => user.email === email);
    if (emailExists) {
      alert('Энэ имэйл аль хэдийн бүртгэгдсэн байна.');
      return;
    }

    
    const updatedUsers = [...existingUsers, newUser];

    
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert('Амжилттай бүртгэгдлээ!');
    setTimeout(() => {
      navigateTo('login');
    }, 1500);
  };

  return (
    <div className="w-full max-w-md border border-gray-300 rounded">
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-medium">Бүртгүүлэх</h2>
          <button
            onClick={() => navigateTo('home')}
            className="text-blue-600 hover:underline"
          >
            Буцах
          </button>
        </div>

        

        <form className="space-y-4">
          <div>
            <label className="block mb-1">Нэр</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
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
          <div>
            <label className="block mb-1">Зургийн URL</label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <button
            type="button"
            onClick={handleRegister}
            className="bg-blue-500 text-white rounded px-4 py-2 w-full"
          >
            Бүртгүүлэх
          </button>
        </form>
      </div>
    </div>
  );
}
