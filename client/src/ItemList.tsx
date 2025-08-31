import { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';

interface Item {
  _id: string;
  text: string;
}

function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    axios.get<Item[]>('/api/items').then(res => setItems(res.data));
  }, []);

  const addItem = async () => {
    const res = await axios.post<Item>('/api/items', { text: input });
    setItems([...items, res.data]);
    setInput('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <ul>
        {items.map(item => <li key={item._id}>{item.text}</li>)}
      </ul>
      <input value={input} onChange={handleInputChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

export default ItemList;