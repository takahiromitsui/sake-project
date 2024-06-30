import express from 'express';
import { fetchBrandsByAreaName } from '../controllers/brands';

export const router = express.Router();

router.get('/:areaName', fetchBrandsByAreaName);
