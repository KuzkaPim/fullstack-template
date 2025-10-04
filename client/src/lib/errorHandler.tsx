import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import React from 'react';

export const handleError = (error: unknown, defaultMessage: string) => {
    if (error instanceof AxiosError) {
        const message = error.response?.data?.message;

        if (Array.isArray(message)) {
            if (message.length === 1) {
                toast.error(message[0]);
            } else {
                toast.error(
                    <div>
                        {message.map((line, i) => (
                            <div
                                style={{
                                    marginTop: i !== 0 ? 15 : 0,
                                    color: '#757575',
                                }}
                                key={i}
                            >
                                {i + 1}. {line}
                            </div>
                        ))}
                    </div>
                );
            }
        } else if (typeof message === 'string') {
            toast.error(message);
        } else {
            toast.error(defaultMessage);
        }
    } else {
        toast.error(defaultMessage);
    }
};
