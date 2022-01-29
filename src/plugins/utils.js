import axios from 'axios'
import { useMain } from '../store/main'

const API_URL = (import.meta.env.DEV) ? 'http://localhost:8055' : import.meta.env.API_URL


export { API_URL }