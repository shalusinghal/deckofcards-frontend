import axios from 'axios';
import { HIGH_SCORE_URL, DECK_BASE_URL } from '../constants';

export const fetchHightScore = () => (axios.get(HIGH_SCORE_URL));

export const addHighScore = (formData) => (axios.post(HIGH_SCORE_URL, formData));

export const resetHightScore = () => (axios.post(`${HIGH_SCORE_URL}/reset`));

export const shuffleDeck = () => (axios.get(`${DECK_BASE_URL}/shuffle`));

export const drawCardFromDeck = (deckId) => (axios.get(`${DECK_BASE_URL}/${deckId}/card/draw`));
