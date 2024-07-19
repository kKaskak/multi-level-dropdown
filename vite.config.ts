import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default () => {
    return defineConfig({
        plugins: [
            react(),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            }
        },
    });
};
