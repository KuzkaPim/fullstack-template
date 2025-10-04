'use client';

import { useState } from 'react';
import styles from './Main.module.sass';

const Main = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleRating = (value: number) => {
        setRating(value);
        console.log('Рейтинг:', value);
    };

    return (
        <div
            style={{
                padding: '20px',
                border: '1px solid #ddd',
                width: '300px',
            }}
        >
            <h3>Товар</h3>
            <p>Цена: 1000₽</p>
            <div style={{ fontSize: '30px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => handleRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        style={{
                            cursor: 'pointer',
                            color:
                                star <= (hover || rating) ? '#ffc107' : '#ddd',
                        }}
                    >
                        ❤
                    </span>
                ))}
            </div>
            <p>Ваш рейтинг: {rating}/5</p>
        </div>
    );
};

export default Main;
