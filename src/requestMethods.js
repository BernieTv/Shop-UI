import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';
const TOKEN =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZThmOWM0NDBlMTYwYzYyNTY1MWNlNCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1OTYwODM4MywiZXhwIjoxNjU5ODY3NTgzfQ.J3-uF2vdNeiugc_HSPklVqFElGno6GpgsTC17KJ5miM';

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	header: { token: `Bearer ${TOKEN}` },
});
