import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 開發中 or 上線版本
  // {your-repo-name} 放上repo的全名 ex:"/todolist1/"
  base: process.env.NODE_ENV === "production" ? "/{your-repo-name}/" : "/",
  plugins: [react()],
})